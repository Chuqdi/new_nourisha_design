"use client";

import { useState, useEffect, useMemo, useContext, useCallback } from "react";
import { useMediaQuery } from "react-responsive";
import { useDebounce } from "use-debounce";
import { useAtomValue } from "jotai";
import { useMutation } from "react-query";
import { usePathname } from "next/navigation";
import axios from "axios";

import SingleCartItemSection from "@/components/sections/SingleCartItemSection";
import Button from "../ui/Button";
import CartSideSection from "./CartSideSection";
import ComingSoonSection from "./ComingSoonSection";

import { BREAKPOINT, CONTINENTS } from "@/config";
import queryKeys from "@/config/queryKeys";
import { ICartItem, IMeal } from "@/config/types";
import useFetch from "@/hooks/useFetch";
import useUnAuthRequest from "@/hooks/useUnAuthRequest";
import { ATOMS } from "@/store/atoms";
import { UserContext } from "@/HOC/UserContext";
import { Icon } from "@iconify/react/dist/iconify.js";

interface MealSelectionProps {
  isSingle?: boolean;
  isHome?: boolean;
  onlyMeals?: boolean;
  colCountClass?: string;
}

export default function MealSelectionSection({
  isSingle = false,
  isHome = false,
  onlyMeals = false,
  colCountClass,
}: MealSelectionProps) {
  // State Management Improvements
  const [activeContinent, setActiveContinent] = useState(CONTINENTS[0]);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [limit, setLimit] = useState("6");
  const [allMealsLoaded, setAllMealLoaded] = useState(false);

  // Hooks and Context
  const { getData } = useUnAuthRequest();
  const { user } = useContext(UserContext);
  const [debouncedSearchPhrase] = useDebounce(searchPhrase, 1000);
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });
  const pathName = usePathname();

  // Atom Values
  const cartItems = useAtomValue(ATOMS.cartItems) as ICartItem[];
  const localCartItem = useAtomValue(ATOMS?.localCartItems);

  // Memoized Values
  const isLoggedIn = useMemo(() => !!user?.email, [user]);

  const isComingSoon = useMemo(() => {
    return (
      activeContinent?.search?.toUpperCase() === "ASIAN" &&
      pathName?.toUpperCase() === "/BULK-MEALS"
    );
  }, [activeContinent, pathName]);

  // Meal Fetching Function (Improved)
  const getMeals = useCallback(() => {
    const orderTypeParam =
      pathName?.toUpperCase() === "/BULK-MEALS" ? "&orderType=bulk-order" : "";

    return getData(
      `meals/pack?page=1&limit=${limit}&continent=${activeContinent.search}&searchPhrase=${searchPhrase}${orderTypeParam}`
    );
  }, [activeContinent, limit, searchPhrase, pathName, getData]);

  // Fetch Meals
  const { data, isLoading } = useFetch(
    getMeals,
    [
      queryKeys.GET_AVAILABLE_MEAL,
      activeContinent?.name,
      limit,
      debouncedSearchPhrase,
    ],
    true
  );

  // Search Mutation
  const searchMutation = useMutation({
    mutationFn: () =>
      axios.post(`${process.env.API_URL}/meals/pack/search/phrase`, {
        searchPhrase,
      }),
    onError: (error) => {
      console.error("Search mutation error:", error);
    },
  });

  // Effect to update meals
  useEffect(() => {
    //@ts-ignore
    if (data?.data?.data) {
      //@ts-ignore
      const { totalCount, data: fetchedMeals } = data.data.data;

      const uniqueMeals = fetchedMeals.filter(
        (meal: IMeal) =>
          !meals.some((existingMeal) => existingMeal._id === meal._id)
      );

      setAllMealLoaded(totalCount === meals.length + uniqueMeals.length);
      setMeals((prev) => [...prev, ...uniqueMeals]);
    }
  }, [data]);

  // Effect for search mutation
  useEffect(() => {
    if (debouncedSearchPhrase) {
      searchMutation.mutate();
    }
  }, [debouncedSearchPhrase]);

  // Load More Handler
  const handleLoadMore = () => {
    setLimit((prev) => prev + 10);
  };

  // Render Methods
  const renderContinentButtons = () => (
    <div
      className={`flex ${
        isHome && "flex-col md:flex-row"
      } items-center gap-4 mt-8 ${(isSingle || isHome) && "justify-center"}`}
    >
      {!isHome && !isMobile && (
        <p className="text-black-900 text-lg">Select a category:</p>
      )}
      {CONTINENTS.map((country, index) => (
        <button
          key={`continent_${index}`}
          onClick={() => setActiveContinent(country)}
          className={`flex gap-3 p-3 h-12 justify-center rounded-full items-center ${
            activeContinent === country ? "bg-[#E1F0D0]" : "bg-[#F2F4F7]"
          }`}
        >
          <p className="text-black-900 font-inter text-lg font-medium">
            {country.noun} Meals
          </p>
        </button>
      ))}
    </div>
  );

  const renderMealGrid = () => {
    const displayMeals =
      searchMutation.isSuccess && searchPhrase.length
        ? (searchMutation.data?.data.data?.meals as IMeal[])
        : meals;

    return (
      <div className="flex items-start gap-2">
        <div className="w-full">
          <div
            className={`grid grid-cols-2 ${
              colCountClass || "md:grid-cols-3"
            } gap-4 mt-4`}
          >
            {displayMeals?.map((meal, index) => (
              <SingleCartItemSection
                key={`cart_item_${meal._id || index}`}
                country={activeContinent}
                isHome={isHome}
                meal={meal}
              />
            ))}
          </div>

          {!allMealsLoaded && (
            <div className="flex justify-center mt-8">
              <Button
                title={isLoading ? "Loading..." : "Load more"}
                onClick={handleLoadMore}
                variant="primary"
                className="py-6 font-bold font-inter h-[2.5rem]"
                disabled={isLoading}
              />
            </div>
          )}
        </div>
        {!!(isLoggedIn ? cartItems : localCartItem).length && (
          <div className="hidden md:block mt-4">
            <CartSideSection />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full">
      {!onlyMeals && !isHome && (
        <h4 className="text-center font-NewSpiritBold text-black-900 text-[2rem] md:text-[3.5rem]">
          Browse & Select meals
        </h4>
      )}

      {!onlyMeals && renderContinentButtons()}

      {isSingle && (
        <div className="flex gap-4 mt-4 items-center">
          {isMobile && (
            <div className="flex items-center gap-2 rounded-full bg-[#F2F4F7] h-12 p-2 w-fit">
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
            className="w-full h-12 px-2 py-4 rounded-full border-2 placeholder:text-sm placeholder:text-black-900 border-[#f2f4f7]"
            value={searchPhrase}
            onChange={(e) => setSearchPhrase(e.target.value)}
          />
        </div>
      )}

      {(isLoading || searchMutation.isLoading) && (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}

      {isComingSoon ? <ComingSoonSection /> : renderMealGrid()}
    </div>
  );
}
