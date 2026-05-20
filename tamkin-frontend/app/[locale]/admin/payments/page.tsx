import RevenueChart from "@/components/charts/RevenueChart";
import PaymentTables from "@/components/tables/PaymentTables";
import React from "react";

const page = () => {
  return (
    <div>
      <RevenueChart />
      <PaymentTables />
    </div>
  );
};

export default page;
