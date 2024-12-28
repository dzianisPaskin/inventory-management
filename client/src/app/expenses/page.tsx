"use client";

import { ChangeEventHandler, MouseEvent, useMemo, useState } from "react";
import {
  ExpenseByCategorySummaryType,
  useGetExpensesByCategoryQuery,
} from "@/store";
import { Header } from "../(components)/Header";
import {
  Pie,
  ResponsiveContainer,
  PieChart,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const CLASSNAMES = {
  label: "block text-sm font-medium text-gray-700",
  selectInput:
    "mt-1 block w-full py-2 pl-3 text-base border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md shadow-sm focus:outline-none",
};

type AggregatedDataItemType = {
  name: string;
  color?: string;
  amount: number;
};

type AggregatedDataType = {
  [category: string]: AggregatedDataItemType;
};

export default function Expenses() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const {
    data: expenses,
    isError,
    isLoading,
  } = useGetExpensesByCategoryQuery();
  const expensesData = useMemo(() => expenses ?? [], [expenses]);
  const parseDate = (date: string) =>
    new Date(date).toISOString().split("T")[0];

  const aggregatedData: AggregatedDataItemType[] = useMemo(() => {
    const filtered: AggregatedDataType = expensesData
      .filter((data: ExpenseByCategorySummaryType) => {
        const matchCategory =
          selectedCategory === "All" || data.category === selectedCategory;
        const dataDate = parseDate(data.date);
        const matchesDate =
          !startDate ||
          !endDate ||
          (dataDate >= startDate && dataDate <= endDate);
        return matchesDate && matchCategory;
      })
      .reduce((acc: AggregatedDataType, data: ExpenseByCategorySummaryType) => {
        const amount = parseInt(data.amount);

        if (!acc[data.category]) {
          acc[data.category] = { name: data.category, amount: 0 };
          acc[data.category].color = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
          acc[data.category].amount += amount;
        }
        return acc;
      }, {});

    return Object.values(filtered);
  }, [expensesData, selectedCategory, startDate, endDate]);

  if (isLoading) return <div className="py-4">Loading...</div>;

  if (isError || !expenses)
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch expenses
      </div>
    );

  const onChangeCategory: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSelectedCategory(e.target.value);
  };
  const onChangeStartDate: ChangeEventHandler<HTMLInputElement> = (e) => {
    setStartDate(e.target.value);
  };
  const onChangeEndDate: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEndDate(e.target.value);
  };
  const onPieEnter = (e: MouseEvent, idx: number) => {
    setActiveIndex(idx);
  };

  return (
    <div>
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of expenses over time
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter by Category and Date
          </h3>

          <div className="space-y-4">
            <div className="mb-4">
              <label className={CLASSNAMES.label} htmlFor="category-select">
                Category
              </label>
              <select
                className={CLASSNAMES.selectInput}
                id="category-select"
                name="category-select"
                defaultValue={selectedCategory}
                onChange={onChangeCategory}
              >
                <option value="All">All</option>
                <option value="Office">Office</option>
                <option value="Professional">Professional</option>
                <option value="Salaries">Salaries</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="mb-4">
              <label className={CLASSNAMES.label} htmlFor="start-date-select">
                Start Date
              </label>
              <input
                className={CLASSNAMES.selectInput}
                id="start-date-select"
                name="start-date-select"
                type="date"
                onChange={onChangeStartDate}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="mb-4">
              <label className={CLASSNAMES.label} htmlFor="end-date-select">
                End Date
              </label>
              <input
                className={CLASSNAMES.selectInput}
                id="end-date-select"
                name="end-date-select"
                type="date"
                onChange={onChangeEndDate}
              />
            </div>
          </div>
        </div>

        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedData}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                fill="#8884d8"
                dataKey="amount"
                onMouseEnter={onPieEnter}
              >
                {" "}
                {aggregatedData.map(
                  (entry: AggregatedDataItemType, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === activeIndex ? "rgb(29, 78, 216)" : entry.color
                      }
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
