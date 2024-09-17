"use client";
import { usePathname } from "next/navigation";

export default () => {
  const pathName = usePathname();
  return [
    {
      page: "/meal_plans",
      isActive: pathName === "/meal_plans",
      name: "Meal Plans",
    },
    {
      page: "/single_meals",
      isActive: pathName === "/single_meals",
      name: "Single meals",
    },
    {
      page: "/bulk_meals",
      isActive: pathName === "/bulk_meals",
      name: "Bulk meals",
    },
    {
      page: "/about_us",
      isActive: pathName === "/about_us",
      name: "Help",
      options: [],
    },
    {
      page: "https://blog.eatnourisha.com/",
      isActive: false,
      name: "Blog",
    },
  ];
};
