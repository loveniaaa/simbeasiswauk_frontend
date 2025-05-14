"use client";
import React from "react";

import TableSection from "./TableSection";
import StatusLegend from "./StatusLegend";
import { FilterSection } from "./FilterSection";

function ContentArea() {
  return (
    <section className="w-full p-1">
      <TableSection />
      <StatusLegend />
    </section>
  );
}

export default ContentArea;
