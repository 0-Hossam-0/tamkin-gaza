import DashboardWrapper from "@/components/layout/DashboardWrapper";
import * as React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1">
      <DashboardWrapper>{children}</DashboardWrapper>
    </div>
  );
}
