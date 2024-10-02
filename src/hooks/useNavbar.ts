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
      name: "Single Meals",
    },
    {
      page: "/bulk_meals",
      isActive: pathName === "/bulk_meals",
      name: "Bulk Meals",
    },
    {
      page: "/party_plan",
      isActive: pathName === "/bulk_meals",
      name: "Party Plans",
    },
    {
      page: "/about_us",
      isActive: pathName === "/about_us",
      name: "About Us",
      options: [],
    },
    {
      page: "/#faq",
      isActive: pathName === "/about_us",
      name: "FAQ",
      options: [],
    },
    {
      page: "https://blog.eatnourisha.com/",
      isActive: false,
      name: "Blog",
    },
  ];
};
