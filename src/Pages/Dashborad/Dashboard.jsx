import React, { useEffect, useState } from "react";
import VendorsCard from "../../components/Vendors/VendorsCard";

function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-xl shadow ">
        <VendorsCard />
      </div>
    </div>
  );
}

export default DashboardPage;
