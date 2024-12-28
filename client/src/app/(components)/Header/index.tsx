import { FC } from "react";

type HeaderType = {
  name: string;
};

export const Header: FC<HeaderType> = ({ name }) => {
  return <h1 className="text-2xl font-semibold text-gray-700">{name}</h1>;
};
