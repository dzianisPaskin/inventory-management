import { createStore } from "./store";

/* REDUX TYPES */
export type AppStoreType = ReturnType<typeof createStore>;
export type RootStateType = ReturnType<AppStoreType["getState"]>;
export type AppDispatch = AppStoreType["dispatch"];

/* API TYPES */
export type ProductType = {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
};

export type SalesSummaryType = {
  salesSummaryId: string;
  totalValue: number;
  changePercentage?: number;
  date: string;
};

export type PurchaseSummaryType = {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage?: number;
  date: string;
};

export type ExpenseSummaryType = {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
};

export type ExpenseByCategorySummaryType = {
  expenseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
};

export type DashboardMetricsType = {
  popularProducts: ProductType[];
  saleSummary: SalesSummaryType[];
  purchaseSummary: PurchaseSummaryType[];
  expenseSummary: ExpenseSummaryType[];
  expenseByCategorySummary: ExpenseByCategorySummaryType[];
};

export type UserType = {
  userId: string;
  name: string;
  email: string;
};
