"use client";

import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { CardExpenseSummary } from "./CardExpenseSummary";
import { CardPopularProducts } from "./CardPopularProducts";
import { CardPurchaseSummary } from "./CardPurchaseSummary";
import { CardSalesSummary } from "./CardSalesSummary";
import { StatCard } from "./StatCard";
import clsx from "clsx";

export default function Dashboard() {
  return (
    <div
      className={clsx(
        "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto",
        "gap-10 pb-4 custom-grid-rows"
      )}
    >
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <CardExpenseSummary />
      <StatCard
        title="Customer & Expenses"
        primaryIcon={<Package className="text-blue-600" size={24} />}
        dateRange="1 - 23 February 2025"
        details={[
          {
            title: "Customer Growth",
            amount: "1,200",
            changePercentage: 12,
            IconComponent: TrendingUp,
          },
          {
            title: "Expenses",
            amount: "1,200",
            changePercentage: -12,
            IconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Dues & Pending Orders"
        primaryIcon={<CheckCircle className="text-blue-600" size={24} />}
        dateRange="1 - 23 February 2025"
        details={[
          {
            title: "Dues",
            amount: "250.00",
            changePercentage: 122,
            IconComponent: TrendingUp,
          },
          {
            title: "Pending orders",
            amount: "147.00",
            changePercentage: -46,
            IconComponent: TrendingDown,
          },
        ]}
      />
      <StatCard
        title="Sales & Discount"
        primaryIcon={<Tag className="text-blue-600" size={24} />}
        dateRange="1 - 23 February 2025"
        details={[
          {
            title: "Sales",
            amount: "800.00",
            changePercentage: 10,
            IconComponent: TrendingUp,
          },
          {
            title: "Discount",
            amount: "100",
            changePercentage: -5,
            IconComponent: TrendingDown,
          },
        ]}
      />
    </div>
  );
}
