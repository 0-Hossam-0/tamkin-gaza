"use client";
import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";
import { Globe } from "lucide-react";
import countries from "i18n-iso-countries";
import { useTranslations } from "next-intl";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const iso2to3 = (code2: string | null) => {
  if (!code2) return null;
  try {
    return countries.alpha2ToAlpha3(code2.toUpperCase());
  } catch {
    return null;
  }
};

const geoUrl = "/features.json";

type TCSVRow = {
  ISO3: string;
  value: number;
  [key: string]: string | number;
};

const FAKE_DATA = [
  // North America / Europe (lower counts)
  { countryCode: "US", count: 5 },
  { countryCode: "FR", count: 3 },
  { countryCode: "BR", count: 2 },
  { countryCode: "DE", count: 4 },
  { countryCode: "GB", count: 3 },

  // Asia (medium counts)
  { countryCode: "IN", count: 6 },
  { countryCode: "CN", count: 7 },

  // Middle East (higher counts)
  { countryCode: "SA", count: 15 }, // Saudi Arabia
  { countryCode: "AE", count: 12 }, // UAE
  { countryCode: "EG", count: 10 }, // Egypt
  { countryCode: "IQ", count: 9 }, // Iraq
  { countryCode: "IL", count: 8 }, // Israel
  { countryCode: "JO", count: 7 }, // Jordan
  { countryCode: "KW", count: 6 }, // Kuwait
  { countryCode: "OM", count: 5 }, // Oman
  { countryCode: "QA", count: 4 }, // Qatar
  { countryCode: "LB", count: 3 }, // Lebanon
  { countryCode: "SY", count: 2 }, // Syria
  { countryCode: "YE", count: 1 }, // Yemen
];

interface MapChartProps {
  apiData?: any[];
}

const Map = ({ apiData = FAKE_DATA }: MapChartProps) => {
  const [csvData, setCsvData] = useState<TCSVRow[]>([]);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    value: number | null;
    iso: string | null;
  }>({ x: 0, y: 0, value: null, iso: null });

  useEffect(() => {
    csv("/vulnerability.csv").then((data: any) => {
      const parsed: TCSVRow[] = data.map((row: any) => ({
        ISO3: row.ISO3,
        value: row["2017"] ? +row["2017"] : 0,
        ...row,
      }));
      setCsvData(parsed);
    });
  }, []);

  const mergedData = React.useMemo(() => {
    const apiMapped: TCSVRow[] = (apiData || [])
      .map((d) => ({
        ISO3: iso2to3(d.countryCode || d.code) || "",
        value: d.count || 0,
      }))
      .filter((d) => d.ISO3 !== "");
    const combined = [...csvData];
    apiMapped.forEach((apiRow) => {
      const exists = combined.find((row) => row.ISO3 === apiRow.ISO3);
      if (exists) exists.value = apiRow.value;
      else combined.push(apiRow);
    });
    return combined;
  }, [csvData, apiData]);

  const maxValue = React.useMemo(
    () => Math.max(...mergedData.map((d) => d.value || 0)),
    [mergedData],
  );

  const blueScale = scaleLinear<string>()
    .domain([0, maxValue || 1])
    .range(["#bfdbfe", "#1e3a8a"]);

  const activeCount = mergedData.filter((d) => d.value >= 1).length;

  return (
    <div className="relative card dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-5 shadow-none">
      {/* ── Map ── */}
      <div className="relative">
        {tooltip.value !== null && tooltip.iso && (
          <div
            className="fixed z-50 pointer-events-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                        border border-gray-200 dark:border-gray-700 px-3 py-1.5 rounded-xl shadow-md text-xs font-medium"
            style={{ top: tooltip.y - 36, left: tooltip.x + 12 }}
          >
            <span className="font-semibold">{tooltip.iso}</span>
            <span className="text-gray-500 dark:text-gray-400"> · </span>
            {tooltip.value}
          </div>
        )}
        <ComposableMap projectionConfig={{ rotate: [-10, 0, 0], scale: 200 }}>
          <Sphere
            id="sphere"
            stroke="#e5e7eb"
            strokeWidth={0.5}
            fill="#f8fafc"
          />
          <Graticule stroke="#e5e7eb" strokeWidth={0.4} />
          {mergedData.length > 0 && (
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const d = mergedData.find((s) => s.ISO3 === geo.id);
                  const fillColor =
                    d && d.value >= 1 ? blueScale(d.value) : "#e5e7eb";
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={fillColor}
                      stroke="#fff"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: {
                          outline: "none",
                          opacity: 0.75,
                          cursor: "crosshair",
                        },
                        pressed: { outline: "none" },
                      }}
                      onMouseMove={(evt) =>
                        setTooltip({
                          x: evt.clientX,
                          y: evt.clientY,
                          value: d && d.value >= 1 ? d.value : null,
                          iso: d && d.value >= 1 ? geo.id : null,
                        })
                      }
                      onMouseLeave={() =>
                        setTooltip({ x: 0, y: 0, value: null, iso: null })
                      }
                    />
                  );
                })
              }
            </Geographies>
          )}
        </ComposableMap>
      </div>
    </div>
  );
};

export default Map;
