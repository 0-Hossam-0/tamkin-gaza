import ReelCreator from "@/components/creators/ReelCreator";
import { RealKips } from "@/components/kpis/RealKips";
import RealsTable from "@/components/tables/RealsTable";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-3">
      <RealKips />
      <ReelCreator />
      <RealsTable />
    </div>
  );
};

export default page;
