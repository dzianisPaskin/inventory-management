"use client";

import { FC, useEffect } from "react";
import { Navbar } from "./(components)/Navbar";
import { SideBar } from "./(components)/Sidebar";
import { StoreProvider } from "@/store";
import { useAppSelector } from "@/store";
import clsx from "clsx";

type DashboardType = {
  children: React.ReactNode;
};

const DashboardLayout: FC<DashboardType> = ({ children }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div
      className={clsx(
        "light flex bg-gray-50 text-gray-900 w-full min-h-screen",
        isDarkMode ? "dark" : "light"
      )}
    >
      <SideBar />
      <main
        className={clsx(
          "flex flex-col w-full h-full py-7 px-9 bg-gray-50",
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        )}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export const DashboardWrapper: FC<DashboardType> = ({ children }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};
