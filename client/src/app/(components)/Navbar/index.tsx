import Link from "next/link";
import { Bell, Menu, Moon, Settings, Sun } from "lucide-react";
import { useToggleSidebar, useToggleDarkMode } from "@/hooks";
import clsx from "clsx";

export const Navbar = () => {
  const { onToggleSidebar } = useToggleSidebar();
  const { onToggleDarkMode, isDarkMode } = useToggleDarkMode();
  return (
    <div className="flex justify-between items-center w-full mb-7">
      <div className="flex justify-between items-center gap-5">
        <button
          className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={onToggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="relative">
          <input
            className={clsx(
              "pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300",
              "bg-white rounded-lg focus:outline-none focus:border-blue-500"
            )}
            type="search"
            placeholder="Start type to search groups & products"
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Bell className="text-gray-500" size={20} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <button onClick={onToggleDarkMode}>
            {isDarkMode ? (
              <Sun className="text-gray-500" size={24} />
            ) : (
              <Moon size={24} />
            )}
          </button>

          <div className="relative cursor-pointer">
            <Bell className="text-gray-500" size={24} />
            <span
              className={clsx(
                "absolute -top-2 -right-2 inline-flex items-center justify-center px-[.4rem] py-1",
                "text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full"
              )}
            >
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9">image</div>
            <span className="font-semibold">Denis</span>
          </div>
        </div>
        <Link href="/settings">
          <Settings className="text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
};
