import { MenuButton } from "@/components/MenuButton";

export const SideBar = () => {
  return (
    <div>
      <div className="flex gap-3 justify-between md:justify-normal items-center pt-8">
        <div>Logo</div>
        <h1 className="font-extrabold text-2xl">EdSTOCK</h1>
        <MenuButton onClick={() => {}} />
      </div>

      <div className="flex-grow mt-8"></div>

      <div>
        <p className="text-center text-xs text-gray-500">&copy; 2024 EdStock</p>
      </div>
    </div>
  );
};
