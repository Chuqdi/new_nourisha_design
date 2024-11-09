"use client";
import { usePathname } from "next/navigation";

export default () => {
  const pathName = usePathname();
  return [
    {
      page: "/meal-plans",
      isActive: pathName === "/meal-plans",
      name: "Meal Plans",
    },
    {
      page: "/single-meals",
      isActive: pathName === "/single-meals",
      name: "Single Meals",
    },
    {
      page: "/bulk-meals",
      isActive: pathName === "/bulk-meals",
      name: "Bulk Meals",
    },
    {
      page: "/party-meal-plans",
      isActive: pathName === "/party-meal-plans",
      name: "Party Plans",
    },
    {
      page: "/about-us",
      isActive: pathName === "/about-us",
      name: "About Us",
      options: [],
    },
    {
      page: "/faq",
      isActive: pathName === "/faq",
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
