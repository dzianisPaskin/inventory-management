import { useAppDispatch, useAppSelector, setIsDarkMode } from "@/store";

type UseToggleDarkModeReturnType = {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
};

export const useToggleDarkMode = (): UseToggleDarkModeReturnType => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const onToggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return { isDarkMode, onToggleDarkMode };
};
