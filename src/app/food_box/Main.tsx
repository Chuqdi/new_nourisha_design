"use client";
import Navbar from "@/components/commons/Navbar";
import DeliveryModal from "@/components/sections/Modals/DeliveryModal";
import SingleCartItemSection from "@/components/sections/SingleCartItemSection";
import Button from "@/components/ui/Button";
import SelectChip from "@/components/ui/SelectChip";
import { CONTINENTS, COUNTRIES, DAYS_OF_THE_WEEK } from "@/config";
import queryKeys from "@/config/queryKeys";
import { IFoodBox, IFoodBoxDayType, IMeal } from "@/config/types";
import { UserContext } from "@/HOC/UserContext";
import useAuth from "@/hooks/useAuth";
import useFetch from "@/hooks/useFetch";
import useFoodbox from "@/hooks/useFoodbox";
import useUnAuthRequest from "@/hooks/useUnAuthRequest";
import { ATOMS } from "@/store/atoms";
import { toast } from "@/ui/use-toast";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";
import {  useEffect, useMemo, useState } from "react";

const SingleWeekendBreakDown = ({
  week,
  activeWeek,
}: {
  week: string;
  activeWeek?: IFoodBoxDayType;
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const { removeFoodBox } = useFoodbox();
  const boxStore = useAtomValue(ATOMS.foodBox) as IFoodBox;
  const activeDayBox = useMemo(() => {
    if (boxStore) {
      //@ts-ignore
      return boxStore[week];
    } else {
      return {};
    }
  }, [boxStore]) as IFoodBox;
  //@ts-ignore
  const activeDayMeal = useMemo(() => activeDayBox?.meals, [activeDayBox]) as {
    first_meal: IMeal;
    last_meal: IMeal;
  };

  return (
    <div
      onClick={() => setShowBreakdown((value) => !value)}
      className="border-b pb-4 cursor-pointer h-fit"
    >
      <div className="flex items-center justify-between">
        <h4 className="font-inter text-[#323546] text-base font-bold tracking-[-0.015rem] leading-[1.5rem]">
          {week}
        </h4>
        {/* {showBreakdown ? (
          <Icon
            color="#030517"
            className="w-6 h-6"
            icon="icon-park-outline:up"
          />
        ) : (
          <Icon
            color="#030517"
            className="w-6 h-6"
            icon="icon-park-outline:down"
          />
        )} */}
      </div>

      <AnimatePresence>
        {true && (
          <motion.div
            initial={{ y: -5 }}
            exit={{ y: -5 }}
            animate={{ y: 0 }}
            className="mt-2 gap-3"
          >
            {activeDayMeal?.first_meal?._id || activeDayMeal?.last_meal?._id ? (
              <div className="flex flex-col gap-3">
                {activeDayMeal?.first_meal?.name && (
                  <div className="flex flex-row justify-between">
                    <h5 className="text-black-900 font-inter text-sm tracking-[-0.01313rem] leading-[1.3125rem] font-semibold">
                      {activeDayMeal?.first_meal?.name}
                    </h5>
                    {week === activeWeek && (
                      <button
                        onClick={() => {
                          removeFoodBox(
                            activeWeek!,
                            activeDayMeal?.first_meal?._id!
                          );
                        }}
                        type="button"
                      >
                        <Icon icon="fa6-solid:minus" />
                      </button>
                    )}
                  </div>
                )}

                {activeDayMeal?.last_meal?.name && (
                  <div className="flex flex-row items-center justify-between">
                    <h5 className="text-black-900 font-inter text-sm tracking-[-0.01313rem] leading-[1.3125rem] font-semibold">
                      {activeDayMeal?.last_meal?.name}
                    </h5>
                    {week === activeWeek && (
                      <button
                        onClick={() =>
                          removeFoodBox(
                            activeWeek!,
                            activeDayMeal?.last_meal?._id!
                          )
                        }
                        type="button"
                      >
                        <Icon icon="fa6-solid:minus" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-center font-inter font-semibold">
                ---No Meal selected---
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
const WeeksBreakDown = ({
  weeks,
  activeWeek,
}: {
  weeks: typeof DAYS_OF_THE_WEEK;
  activeWeek?: IFoodBoxDayType;
}) => {
  return (
    <div className="flex flex-col gap-4">
      {weeks.map((week, index) => (
        <SingleWeekendBreakDown
          activeWeek={activeWeek}
          week={week}
          key={`weeek_break_down_${index}`}
        />
      ))}
    </div>
  );
};

export default function Main() {
  const navigation = useRouter();
  const [activeCountry, setActiveCountry] = useState(COUNTRIES[0]);
  const searchParams = useSearchParams();

  const setSideModal = useSetAtom(ATOMS.showSideModal);
  const isWeekly = useMemo(
    () => searchParams.get("plan")?.includes("5".toUpperCase()),
    [searchParams]
  );
  const weeks = useMemo(() => {
    if (isWeekly) {
      return DAYS_OF_THE_WEEK.filter((wk) => {
        return !(wk === "Sunday") && !(wk === "Saturday");
      });
    }

    return DAYS_OF_THE_WEEK;
  }, [isWeekly]);
  const [activeWeek, setActiveWeek] = useState<IFoodBoxDayType>(
    weeks[0] as IFoodBoxDayType
  );
  const { getData } = useUnAuthRequest();
  const [meals, setMeals] = useState<IMeal[]>([]);
  const boxStore = useAtomValue(ATOMS.foodBox) as IFoodBox;
  const { initializeFoodBox, emptyBox } = useFoodbox();
  const { axiosClient } = useAuth();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState("10");
  const [delivery_date, set_delivery_date] = useState(Date.now().toString());

  const getMeals = () => {
    return getData(
      `meals/pack?page=1&limit=${limit}&country=${activeCountry?.name}`
    );
  };

  const numberOfMealsSelected = useMemo(() => {
    let count = 0;
    if (boxStore) {
      weeks.map((w) => {
        //@ts-ignore
        const activeDayBox = boxStore[w];

        const activeDayMeal = activeDayBox?.meals as {
          first_meal: IMeal;
          last_meal: IMeal;
        };

        if (activeDayMeal?.first_meal?._id && activeDayMeal?.last_meal?._id) {
          count = count + 1;
        }
      });
    }

    return count;
  }, [boxStore]);

  const prepareMealForBE = () => {
    return DAYS_OF_THE_WEEK.map((week) => {
      if (boxStore) {
        //@ts-ignore
        const activeDayBox = boxStore[week];
        const meals = activeDayBox?.meals as {
          first_meal: IMeal;
          last_meal: IMeal;
        };

        return {
          [week?.toLowerCase()]: {
            lunch: {
              mealId: meals?.first_meal?._id,
            },
            dinner: {
              mealId: meals?.last_meal?._id,
            },
          },
        };
      }

      return {};
    });
  };

  const createLineUp = async () => {
    if (numberOfMealsSelected < weeks.length) {
      toast({
        variant: "default",
        title: "Error",
        description: "You must select meal for all week days.",
      });
      return;
    }

    setLoading(true);
    const data = prepareMealForBE();
    axiosClient
      .post(`lineups`, { ...data, delivery_date })
      .then((data) => {
        toast({
          variant: "default",
          title: "Success",
          description: "Line-up created successfully.",
        });
        emptyBox();
      })
      .catch((err) => {
        let msg = err?.response?.data?.message ?? "Line-up was not created.";
        toast({
          variant: "destructive",
          title: "Error",
          description: msg,
        });
      })
      .finally(() => {
        setLoading(false);
      });
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

  useEffect(() => {
    initializeFoodBox();
  }, []);

  return (
    <div className="w-full h-full relative pt-6">
      <Navbar />

      <div className="flex flex-col gap-6 mt-32 mx-1.25 md:mx-6.25">
        <div
          onClick={() => navigation.back()}
          className="cursor-pointer flex items-center gap-3 text-black-900 font-inter tracking-[-0.01688rem] leading-[1.687rem]"
        >
          <Icon color="#030517" icon="ep:back" className="w-7 h-7" />
          Back
        </div>

        <div className="mt-8">
          <h4 className="text-[#323546] font-NewSpiritBold text-[2rem] md:text-[3.5rem]">
            Build your food box
          </h4>
          <p className="text-black-900 text-lg font-inter tracking-[-0.01688rem] leading-[1.688rem]">
            Select your favourites from our mouthwatering range of meals.
          </p>
          <div className="w-full gap-3 flex flex-col border-t-[0.2px] border-t-[#d5d5d5aa] pt-8 mt-4">
            <div className="grid grid-cols-2 md:flex items-center   gap-5 w-fit">
              {CONTINENTS.map((country, index) => {
                const selected = country === activeCountry;
                return (
                  <SelectChip
                    key={`countries__${index}`}
                    onClick={() => setActiveCountry(country)}
                    title={country.name + " Meals"}
                    selected={selected}
                  />
                );
              })}
            </div>

            <div className="flex gap-4   items-center  ">
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
                className="w-full h-12 px-[0.45rem] py-4 rounded-[2rem] border-[2px] placeholder:text-sm placeholder:text-black-900 bor  #f2f4f7]"
              />
            </div>
            <div className="grid grid-cols-2 md:flex items-center  gap-5 w-fit">
              {weeks.map((week, index) => {
                const selected = week === activeWeek;
                return (
                  <SelectChip
                    onClick={() => setActiveWeek(week as IFoodBoxDayType)}
                    title={week}
                    selected={selected}
                    key={`days_of_the_week_${index}`}
                  />
                );
              })}
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <h4 className="text-[#323546] font-NewSpiritBold text-2xl tracking-[-0.0225rem]">
                Select monday meals
              </h4>
              <div className="flex flex-col md:flex-row gap-4 items-start ">
                <div className="w-full md:w-[70%]">
                  {isLoading && (
                    <p className="text-center my-8"> Loading meals...</p>
                  )}
                  <div
                    className={`
                    grid grid-cols-2 md:grid-cols-3 gap-4 mt-4
                    `}
                  >
                    {meals.map((meal, index) => (
                      <SingleCartItemSection
                        country={activeCountry}
                        isFoodBox
                        meal={meal}
                        activeWeek={activeWeek}
                        key={`cart_item_${index}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-[30%] rounded-[0.75rem] mt-4 bg-[#F2F4F7] py-4 px-3 flex flex-col gap-3 mb-8">
                  <h4 className="text-[#323546] text-[1.5rem] font-NewSpiritBold">
                    Plan summary
                  </h4>

                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-[0.375rem] bg-[#D9D9D9]">
                        <div
                          className="h-full bg-[#04A76C]"
                          style={{
                            width: `${
                              (numberOfMealsSelected / weeks.length) * 100
                            }%`,
                          }}
                        />
                      </div>
                      <p className="text-black-900 font-inter text-sm tracking-[-0.01313rem] leading-[1.3125rem]">
                        {numberOfMealsSelected}/{weeks.length}
                      </p>
                    </div>
                    <p className="text-black-900 text-sm font-inter tracking-[-0.0131313rem] leading-[1.3125rem]">
                      Add {weeks.length} more days to complete your
                      plan
                    </p>
                  </div>

                  <WeeksBreakDown weeks={weeks} activeWeek={activeWeek} />

                  <Button
                    onClick={() =>
                      setSideModal({
                        component: (
                          <DeliveryModal
                            setDeliveryDate={set_delivery_date}
                            proceed={createLineUp}
                          />
                        ),
                        show: true,
                      })
                    }
                    fullWidth
                    disabled={loading}
                    title="Proceed"
                    variant="primary"
                    className="py-6 h-[2.7rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
