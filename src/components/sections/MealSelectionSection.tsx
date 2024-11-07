"use client";

import SingleCartItemSection from "@/components/sections/SingleCartItemSection";
import { BREAKPOINT, CONTINENTS } from "@/config";
import queryKeys from "@/config/queryKeys";
import { ICartItem, IMeal } from "@/config/types";
import useFetch from "@/hooks/useFetch";
import useUnAuthRequest from "@/hooks/useUnAuthRequest";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext, useEffect, useMemo, useState } from "react";
import Button from "../ui/Button";
import { useMediaQuery } from "react-responsive";
import { useDebounce } from "use-debounce";
import CartSideSection from "./CartSideSection";
import { useAtomValue } from "jotai";
import { ATOMS } from "@/store/atoms";
import { usePathname } from "next/navigation";
import ComingSoonSection from "./ComingSoonSection";
import { useMutation } from "react-query";
import axios from "axios";
import { UserContext } from "@/HOC/UserContext";

export default function MealSelectionSection({
  isSingle,
  isHome,
  onlyMeals,
  colCountClass,
}: {
  isSingle?: boolean;
  isHome?: boolean;
  onlyMeals?: boolean;
  colCountClass?: string;
}) {
  const [activeContinent, setActiveContinent] = useState(CONTINENTS[0]);
  const { getData } = useUnAuthRequest();
  const [searchPhrase, setSearchPhrase] = useState("");
  const [phrase] = useDebounce(searchPhrase, 1000);
  const [meals, setMeals] = useState<IMeal[]>([]);
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });
  const [limit, setLimit] = useState("6");
  const cartItems = useAtomValue(ATOMS.cartItems) as ICartItem[];
  const pathName = usePathname();
  const [allMealsLoaded, setAllMealLoaded] = useState(false);
  const localCartItem = useAtomValue(ATOMS?.localCartItems);


  const getMeals = () => {
    return getData(
      `meals/pack?page=1&limit=${limit}&continent=${
        activeContinent.search
      }&searchPhrase=${searchPhrase}${
        pathName?.toUpperCase() === "/bulk_meals".toUpperCase() &&
        "&orderType=bulk-order"
      }`
    );
  };

  const isComingSoon = useMemo(() => {
    return (
      activeContinent?.search?.toUpperCase() === "Asian".toUpperCase() &&
      pathName?.toUpperCase() === "/bulk_meals".toUpperCase()
    );
  }, [activeContinent, pathName]);
  const { user } = useContext(UserContext);

  const isLoggedIn = useMemo(() => !!user?.email, [user]);


  const { data, isLoading } = useFetch(
    getMeals,
    [queryKeys.GET_AVAILABLE_MEAL, activeContinent?.name, limit, phrase],
    true
  );

  const mutation = useMutation({
    mutationFn: (newTodo) => {
      return axios.post(`${process.env.API_URL}/meals/pack/search/phrase`, {
        searchPhrase,
      });
    },
   
  });

  useEffect(() => {
    //@ts-ignore
    if (data?.data?.data) {
      //@ts-ignore
      const totalCount = data?.data?.data?.totalCount;
      //@ts-ignore
      const m = data?.data?.data?.data;

      const c = m?.filter((d: IMeal) => meals?.some((_) => _._id === d?._id));

      setAllMealLoaded(totalCount === c?.length);

      //@ts-ignore
      setMeals(data?.data?.data?.data);
    }
  }, [data]);


  useEffect(() => {
    if (phrase) {
      mutation.mutate();
    }
  }, [phrase]);

  return (
    <div
      className={`w-full
      
      `}
    >
      {!onlyMeals && !isHome && (
        <h4 className="text-center font-NewSpiritBold text-black-900 text-[2rem] md:text-[3.5rem]">
          Browse & Select meals
        </h4>
      )}

      {!onlyMeals && (
        <div
          className={` flex ${
            isHome && "flex-col md:flex-row"
          } grid-cols-2  items-center gap-4 mt-[2rem]  ${
            (isSingle || isHome) && "justify-center"
          }`}
        >
          {!isHome && !isMobile && (
            <p className="text-black-900 text-lg tracking-[-0.01688rem] leading-[1.6875rem]">
              Select a category:
            </p>
          )}
          {CONTINENTS.map((country, index) => {
            const selected = activeContinent === country;
            return (
              <button
                onClick={() => setActiveContinent(country)}
                className={`flex gap-3 p-3 h-12 justify-center rounded-full items-center flex-nowrap whitespace-nowrap  ${
                  selected ? "bg-[#E1F0D0]" : "bg-[#F2F4F7]"
                }`}
                key={`active_countries_${index}`}
              >
                <p className="text-black-900 font-inter text-lg leading-[1.6875rem] tracking-[-0.01688rem] font-[500]">
                  {country.noun} Meals
                </p>
              </button>
            );
          })}
        </div>
      )}

      {isSingle && !isComingSoon && (
        <div className="flex gap-4 mt-4  items-center">
          {isMobile && (
            <div className="flex items-center gap-[0.25rem] rounded-[2rem] bg-[#F2F4F7] h-12 p-2 w-fit">
              <Icon
                color="#030517"
                icon="hugeicons:filter-horizontal"
                className="text-lg"
              />
              <p className="text-lg text-black-900 font-inter">Filter</p>
            </div>
          )}
          <input
            placeholder="Search Meals"
            className="w-full h-12 px-[0.45rem] py-4 rounded-[2rem] border-[2px] placeholder:text-sm placeholder:text-black-900 border-[#f2f4f7]"
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
        </div>
      )}

      {(isLoading || mutation?.isLoading) && (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}
      {isComingSoon ? (
        <div className="my-8 w-full">
          <ComingSoonSection />
        </div>
      ) : (
        <div className="flex items-start gap-2">
          <div className="w-full">
            <div
              className={`
        grid grid-cols-2 ${
          colCountClass ? colCountClass : "md:grid-cols-3"
        } gap-4 mt-4
        `}
            >
              {(mutation?.isSuccess && !!searchPhrase?.length
                ? (mutation?.data?.data.data?.meals as IMeal[])
                : meals
              ).map((meal, index) => (
                <SingleCartItemSection
                  country={activeContinent}
                  isHome={isHome}
                  meal={meal}
                  key={`cart_item_${index}`}
                />
              ))}
            </div>

            {!allMealsLoaded && (
              <div className="flex items-center justify-center mt-8">
                <Button
                  title={isLoading ? "Loading..." : "Load more"}
                  onClick={() =>
                    setLimit((value) => (parseInt(value) + 10).toString())
                  }
                  variant="primary"
                  className="py-6 font-bold font-inter h-[2.5rem]"
                />
              </div>
            )}
          </div>
          { !!(isLoggedIn?cartItems:localCartItem).length && (
            <div className="hidden md:block mt-4">
              <CartSideSection />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
