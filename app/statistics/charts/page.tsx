"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";
import { DailyRecord } from "../../lib/types";

const F = "IBM Plex Sans Arabic, Arial, sans-serif";
type CK = "ext_killed_cum"|"ext_injured_cum"|"ext_killed_children_cum"|"ext_killed_women_cum";

const CHARTS = [
  { key:"ext_killed_cum"          as CK, label:"إجمالي الشهداء",  color:"#dc2626", bg:"#fff5f5" },
  { key:"ext_injured_cum"         as CK, label:"إجمالي الجرحى",   color:"#d97706", bg:"#fffbeb" },
  { key:"ext_killed_children_cum" as CK, label:"شهداء الأطفال",  color:"#7c3aed", bg:"#f5f3ff" },
  { key:"ext_killed_women_cum"    as CK, label:"شهداء النساء",    color:"#db2777", bg:"#fdf2f8" },
];

export default function ChartsPage() {
  const [data, setData]     = useState<DailyRecord[]>([]);
  const [loading, setLoad]  = useState(true);
  const [active, setActive] = useState<CK>("ext_killed_cum");
  const [range, setRange]   = useState(90);

  useEffect(()=>{
    fetch("https://data.techforpalestine.org/api/v2/casualties_daily.json")
      .then(r=>r.json()).then((d:DailyRecord[])=>{ setData(d); setLoad(false); });
  },[]);

  const shown = range===0 ? data : data.slice(-range);
  const cfg   = CHARTS.find(c=>c.key===active)!;
  const vals  = shown.map(d=>(d[active] as number)??0);
  const maxV  = Math.max(...vals,1); const minV = Math.min(...vals);
  const lastV = vals[vals.length-1]??0;
  const W=700,H=230,pL=58,pR=14,pT=18,pB=38;
  const iW=W-pL-pR, iH=H-pT-pB;
  const step = Math.max(1,Math.floor(shown.length/120));
  const samp  = shown.filter((_,i)=>i%step===0||i===shown.length-1);
  const pts   = samp.map((d,i)=>({
    x: pL+(i/(samp.length-1||1))*iW,
    y: pT+iH-((((d[active] as number)??0)-minV)/(maxV-minV||1))*iH,
  }));
  const line = pts.length>1 ? pts.map((p,i)=>`${i===0?"M":"L"} ${p.x} ${p.y}`).join(" ") : "";
  const area = pts.length>1 ? `M ${pts[0].x} ${pT+iH} L ${pts[0].x} ${pts[0].y} ${pts.slice(1).map(p=>`L ${p.x} ${p.y}`).join(" ")} L ${pts[pts.length-1].x} ${pT+iH} Z` : "";
  const yTicks = [0,.25,.5,.75,1].map(t=>({ val:Math.round(minV+t*(maxV-minV)), y:pT+iH-t*iH }));
  const xLbls  = [samp[0], samp[Math.floor(samp.length/2)], samp[samp.length-1]].filter(Boolean);

  return (
    <div style={{ minHeight:"100vh", background:"#f0f0ee", direction:"rtl" }}>
      <Navbar />
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"22px 24px 0", fontFamily:F }}>
        <div style={{ fontSize:12, color:"#999", display:"flex", gap:6, marginBottom:8 }}>
          <Link href="/" style={{ color:"#999", textDecoration:"none" }}>الرئيسية</Link>
          <span>/</span><Link href="/statistics" style={{ color:"#999", textDecoration:"none" }}>الإحصائيات</Link>
          <span>/</span><span style={{ color:"#1a1a1a" }}>الرسوم البيانية</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <h1 style={{ fontSize:34, fontWeight:700, color:"#1a1a1a" }}>الرسوم البيانية</h1>
          <div style={{ display:"flex", gap:8 }}>
            {[{l:"الإجمالي",h:"/statistics"},{l:"الرسوم البيانية",h:"/statistics/charts",a:true},{l:"اليومي",h:"/statistics/daily"}].map(t=>(
              <Link key={t.h} href={t.h} style={{ padding:"9px 20px", borderRadius:100, textDecoration:"none", fontSize:13, fontWeight:t.a?600:400, background:t.a?"#1a1a1a":"#fff", color:t.a?"#fff":"#666", border:t.a?"none":"1px solid #e0e0e0" }}>{t.l}</Link>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"22px auto", padding:"0 24px", fontFamily:F }}>
        {loading ? (
          <div style={{ textAlign:"center", padding:"80px 0", color:"#888", fontSize:16 }}>
            <div style={{ fontSize:36, marginBottom:14 }}>⌛</div>جاري تحميل البيانات...
          </div>
        ):(
          <>
            {/* Chart type */}
            <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap" }}>
              {CHARTS.map(c=>(
                <button key={c.key} onClick={()=>setActive(c.key)} style={{ padding:"9px 18px", borderRadius:100, border:`1.5px solid ${active===c.key?c.color:"#e0e0e0"}`, background:active===c.key?c.bg:"#fff", color:active===c.key?c.color:"#666", fontFamily:F, fontWeight:active===c.key?700:400, fontSize:13, cursor:"pointer" }}>
                  {c.label}
                </button>
              ))}
            </div>

            {/* Main chart */}
            <div style={{ background:"#fff", border:"1px solid #e8e8e8", borderRadius:16, padding:"24px", marginBottom:20 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:12 }}>
                <div>
                  <div style={{ fontSize:13, color:"#888", marginBottom:4 }}>{cfg.label}</div>
                  <div style={{ fontSize:36, fontWeight:700, color:cfg.color }}>{lastV.toLocaleString("ar-EG")}</div>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  {[{v:30,l:"30 يوم"},{v:90,l:"90 يوم"},{v:180,l:"6 أشهر"},{v:0,l:"الكل"}].map(r=>(
                    <button key={r.v} onClick={()=>setRange(r.v)} style={{ padding:"7px 14px", borderRadius:100, border:"none", background:range===r.v?"#1a1a1a":"#f5f5f5", color:range===r.v?"#fff":"#888", fontFamily:F, fontSize:12, cursor:"pointer", fontWeight:range===r.v?600:400 }}>{r.l}</button>
                  ))}
                </div>
              </div>
              <div style={{ overflowX:"auto" }}>
                <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display:"block" }}>
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={cfg.color} stopOpacity=".18"/>
                      <stop offset="100%" stopColor={cfg.color} stopOpacity=".01"/>
                    </linearGradient>
                  </defs>
                  {yTicks.map((t,i)=>(
                    <g key={i}>
                      <line x1={pL} y1={t.y} x2={W-pR} y2={t.y} stroke="#f0f0f0" strokeWidth="1"/>
                      <text x={pL-5} y={t.y+4} textAnchor="end" fontSize="10" fill="#bbb" fontFamily="Arial">
                        {t.val>=1000?`${(t.val/1000).toFixed(0)}k`:t.val}
                      </text>
                    </g>
                  ))}
                  {xLbls.map((d,i)=>{
                    const idx = [0,Math.floor(pts.length/2),pts.length-1][i];
                    return <text key={i} x={pts[idx]?.x??0} y={H-8} textAnchor="middle" fontSize="10" fill="#bbb" fontFamily="Arial">{d?.report_date?.slice(0,7)}</text>;
                  })}
                  {area&&<path d={area} fill="url(#g)"/>}
                  {line&&<path d={line} fill="none" stroke={cfg.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>}
                  {pts.length>0&&<circle cx={pts[pts.length-1].x} cy={pts[pts.length-1].y} r="5" fill={cfg.color} stroke="#fff" strokeWidth="2"/>}
                </svg>
              </div>
            </div>

            {/* Mini charts */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16 }}>
              {CHARTS.map(c=>{
                const v2  = shown.map(d=>(d[c.key] as number)??0);
                const mx  = Math.max(...v2,1); const mn = Math.min(...v2);
                const s2  = Math.max(1,Math.floor(shown.length/40));
                const smp = shown.filter((_,i)=>i%s2===0||i===shown.length-1);
                const pPts= smp.map((d,i)=>`${(i/(smp.length-1||1))*160},${40-((((d[c.key] as number)??0)-mn)/(mx-mn||1))*36}`).join(" ");
                return (
                  <button key={c.key} onClick={()=>setActive(c.key)} style={{ background:active===c.key?c.bg:"#fff", border:`1.5px solid ${active===c.key?c.color+"40":"#e8e8e8"}`, borderRadius:14, padding:"16px", cursor:"pointer", textAlign:"right" }}>
                    <div style={{ fontSize:11, color:"#888", marginBottom:4, fontFamily:F }}>{c.label}</div>
                    <div style={{ fontSize:20, fontWeight:700, color:c.color, marginBottom:10, fontFamily:F }}>{(v2[v2.length-1]??0).toLocaleString("ar-EG")}</div>
                    <svg width="100%" viewBox="0 0 160 44" style={{ display:"block" }}>
                      <polyline points={pPts} fill="none" stroke={c.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
      <Footer />
      <style>{`*{box-sizing:border-box;}`}</style>
    </div>
  );
}