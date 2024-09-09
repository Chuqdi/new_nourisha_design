import { Icon } from "@iconify/react/dist/iconify.js";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

const useDashboardNavbarOption =()=>{
    const pathname = usePathname();
  const links =useMemo(()=>{
    return 
  }, []);
  return links;
}

export default useDashboardNavbarOption;