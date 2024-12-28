import { FC } from "react";
import { Menu } from "lucide-react";

type MenuButtonType = {
  onClick: () => void;
};

export const MenuButton: FC<MenuButtonType> = ({ onClick }) => {
  return (
    <button
      className="md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100"
      onClick={onClick}
    >
      <Menu size={16} />
    </button>
  );
};
