import * as React from "react";

const MOBILE_BREAKPOINT = 768;

type MobileReturn = {
  isMobile: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

export function useMobile(): MobileReturn {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Close sidebar when switching from mobile to desktop
  React.useEffect(() => {
    if (!isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  const toggleSidebar = React.useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  return {
    isMobile,
    isSidebarOpen,
    toggleSidebar,
  };
}
