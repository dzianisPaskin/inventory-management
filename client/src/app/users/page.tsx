"use client";

import { useGetUsersQuery, UserType } from "@/store";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Header } from "../(components)/Header";

const COLUMNS: GridColDef[] = [
  {
    field: "userId",
    headerName: "ID",
    width: 90,
  },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
];

export default function Users() {
  const { data: users, isError, isLoading } = useGetUsersQuery();
  const onGetRowId = (row: UserType) => row.userId;

  if (isLoading) return <div className="py-4">Loading...</div>;

  if (isError || !users)
    return (
      <div className="text-center text-red-500 py-4">Failed to fetch users</div>
    );
  return (
    <div className="flex flex-col">
      <Header name="Users" />
      <DataGrid
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 text-gray-700"
        rows={users}
        columns={COLUMNS}
        getRowId={onGetRowId}
        checkboxSelection
      />
    </div>
  );
}
