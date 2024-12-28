"use client";

import { ProductType, useGetProductsQuery } from "@/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Header } from "../(components)/Header";

const COLUMNS: GridColDef[] = [
  {
    field: "productId",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Product Name",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (_, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (_, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock Quantity",
    width: 150,
    type: "number",
  },
];

export default function Inventory() {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  const onGetRowId = (row: ProductType) => row.productId;

  if (isLoading) return <div className="py-4">Loading...</div>;

  if (isError || !products)
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 text-gray-700"
        rows={products}
        columns={COLUMNS}
        getRowId={onGetRowId}
        checkboxSelection
      />
    </div>
  );
}
