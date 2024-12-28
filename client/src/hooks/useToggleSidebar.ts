import { useAppDispatch, useAppSelector, setIsSidebarCollapsed } from "@/store";

type UseToggleSidebarReturnType = {
  onToggleSidebar: () => void;
  isSidebarCollapsed: boolean;
};

export const useToggleSidebar = (): UseToggleSidebarReturnType => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const onToggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  return { onToggleSidebar, isSidebarCollapsed };
};
