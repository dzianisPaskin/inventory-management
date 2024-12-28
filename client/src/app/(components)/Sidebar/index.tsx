import { FC } from "react";
import { usePathname } from "next/navigation";
import { useToggleSidebar } from "@/hooks";
import Link from "next/link";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import clsx from "clsx";

type SidebarLinkProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
};

const SidebarLink: FC<SidebarLinkProps> = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}) => {
  const pathName = usePathname();
  const isActive =
    pathName === href || (pathName === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={clsx(
          "flex items-center",
          isCollapsed ? "justify-center py-4" : "justify-start py-4 px-8",
          "hover:text-blue-100 hover:bg-blue-100 gap-3 transition-colors",
          isActive ? "text-white bg-blue-200" : ""
        )}
      >
        <Icon className="text-gray-700" size={24} />
        <span
          className={clsx(
            isCollapsed ? "hidden" : "block",
            "font-medium text-gray-700"
          )}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

export const SideBar = () => {
  const { onToggleSidebar, isSidebarCollapsed } = useToggleSidebar();

  const sidebarLinksViewModel: Omit<SidebarLinkProps, "isCollapsed">[] = [
    {
      href: "/dashboard",
      icon: Layout,
      label: "Dashboard",
    },
    {
      href: "/inventory",
      icon: Archive,
      label: "Inventory",
    },
    {
      href: "/products",
      icon: Clipboard,
      label: "Products",
    },
    {
      href: "/users",
      icon: User,
      label: "Users",
    },
    {
      href: "/settings",
      icon: SlidersHorizontal,
      label: "Settings",
    },
    {
      href: "/expenses",
      icon: CircleDollarSign,
      label: "Expenses",
    },
  ];

  return (
    <div
      className={clsx(
        "fixed flex flex-col bg-white h-full shadow-md z-40",
        "transition-all duration-300 overflow-hidden",
        isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
      )}
    >
      <div
        className={clsx(
          isSidebarCollapsed ? "px-4" : "px-8",
          "flex gap-3 justify-between md:justify-normal items-center pt-8"
        )}
      >
        <div>logo</div>
        <h1
          className={clsx(
            isSidebarCollapsed ? "hidden" : "block",
            "font-extrabold text-2xl"
          )}
        >
          EdSTOCK
        </h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={onToggleSidebar}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-grow mt-8">
        {sidebarLinksViewModel.map((link) => {
          return (
            <SidebarLink
              key={link.href}
              icon={link.icon}
              href={link.href}
              label={link.label}
              isCollapsed={isSidebarCollapsed}
            />
          );
        })}
      </div>

      <div className={clsx(isSidebarCollapsed ? "hidden" : "block", "mb-10")}>
        <p className="text-center text-xs text-gray-500">&copy; 2024 EdStock</p>
      </div>
    </div>
  );
};
