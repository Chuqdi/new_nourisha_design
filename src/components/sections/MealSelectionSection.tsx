import { COUNTRIES } from "@/config";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import SingleCartItemSection from "@/components/sections/SingleCartItemSection";
import useUnAuthRequest from "@/hooks/useUnAuthRequest";
import useFetch from "@/hooks/useFetch";
import queryKeys from "@/config/queryKeys";
import { IMeal } from "@/config/types";
import Button from "../ui/Button";


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
  const [activeCountry, setActiveCountry] = useState(COUNTRIES[0]);
  const { getData } = useUnAuthRequest();
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [limit, setLimit] = useState("10");
  const getMeals = () => {
    return getData(
      `meals/pack?page=1&limit=${limit}&country=${activeCountry?.name}`
    );
  };

  const { data, isLoading } = useFetch(
    getMeals,
    [queryKeys.GET_AVAILABLE_MEAL, activeCountry?.name, limit],
    true
  );

  useEffect(() => {
    //@ts-ignore
    if (data?.data?.data) {
      //@ts-ignore
      setMeals(data?.data?.data?.data);
    }
  }, [data]);
  return (
    <div className={
      `w-full
      
      `
    }>
      {!onlyMeals && !isHome && (
        <h4 className="text-center font-NewSpiritBold text-black-900 text-[2rem] md:text-[3.5rem]">
          Browse & Select meals
        </h4>
      )}

      {!onlyMeals && (
        <div
          className={` grid md:flex grid-cols-2  items-center gap-4 mt-[2rem]  ${
            isSingle && "justify-center"
          }`}
        >
          {!isHome && (
            <p className="text-black-900 text-lg tracking-[-0.01688rem] leading-[1.6875rem]">
              Choose a country:
            </p>
          )}
          {COUNTRIES.map((country, index) => {
            const selected = activeCountry === country;
            return (
              <button
                onClick={() => setActiveCountry(country)}
                className={`flex gap-3 p-3 h-12 justify-center rounded-full items-center flex-nowrap whitespace-nowrap  ${
                  selected ? "bg-[#E1F0D0]" : "bg-[#F2F4F7]"
                }`}
                key={`active_countries_${index}`}
              >
                <div className="w-8 h-8 flex justify-center items-center overflow-hidden text-[2.5rem] rounded-full border">
                  {country.flag}
                </div>
                <p className="text-black-900 font-inter text-lg leading-[1.6875rem] tracking-[-0.01688rem]">
                  {country.noun} Meals
                </p>
              </button>
            );
          })}
        </div>
      )}

      {!onlyMeals && !isSingle && (
        <div className="flex gap-4 mt-4  items-center">
          <div className="flex items-center gap-[0.25rem] rounded-[2rem] bg-[#F2F4F7] h-12 p-2 w-fit">
            <Icon
              color="#030517"
              icon="hugeicons:filter-horizontal"
              className="text-lg"
            />
            <p className="text-lg text-black-900 font-inter">Filter</p>
          </div>
          <input
            placeholder="Search Meals"
            className="w-full h-12 px-[0.45rem] py-4 rounded-[2rem] border-[2px] placeholder:text-sm placeholder:text-black-900 border-[#f2f4f7]"
          />
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}

      <div
        className={`
        grid grid-cols-1 ${
          colCountClass ? colCountClass : "md:grid-cols-4"
        } gap-4 mt-4
        `}
      >
        {meals.map((meal, index) => (
          <SingleCartItemSection
            country={activeCountry}
            isHome={isHome}
            meal={meal}
            key={`cart_item_${index}`}
          />
        ))}
      </div>

      <div className="flex items-center justify-center mt-8">
        <Button
          title={isLoading ? "Loading..." : "Load more"}
          onClick={() => setLimit((value) => (parseInt(value) + 10).toString())}
          variant="primary"
        />
      </div>
    </div>
  );
}
