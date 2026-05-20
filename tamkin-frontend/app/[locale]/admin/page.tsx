import Map from "@/components/charts/Map";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h1>Geo For Users:</h1>
        <Map />
      </div>
    </div>
  );
};

export default page;
