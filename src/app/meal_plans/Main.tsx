"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import SelectOrdertypeModalSection from "@/components/sections/Modals/SelectordertypeModalSection";
import ReactSwitch from "react-switch";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { CONTINENTS } from "@/config";
import queryKeys from "@/config/queryKeys";
import { IPlan, IUser } from "@/config/types";
import useAuth from "@/hooks/useAuth";
import { DEVICE_ID } from "@/hooks/useFingerPrint";
import useUser from "@/hooks/useUser";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

const SinglePlan = ({
  activeOptionIndex,
  index,
  setIsWeekend,
  setActiveOptionIndex,
  option,
  onAfrican,
}: {
  activeOptionIndex: number;
  index: number;
  setActiveOptionIndex: (value: number) => void;
  option: IPlan;
  isWeekend: boolean;
  setIsWeekend: (value: boolean) => void;
  onAfrican?: boolean;
}) => {
  const selected = activeOptionIndex === index;
  const perMealPrice = useMemo(() => {
    if (option?.name?.includes("5")) {
      return onAfrican ? "8" : "7.10";
    } else if (option.name?.includes("MONTHLY")) {
      return onAfrican ? "7.14" : "6.85";
    }
    return onAfrican ? "7.14" : "6.85";
  }, [onAfrican]);

  useEffect(() => {
    if (!selected) {
      setIsWeekend(false);
    }
  }, [selected]);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setActiveOptionIndex(index);
        // setIsWeekend(false);
      }}
      className={`p-4 rounded-[0.75rem] flex-1 flex flex-col gap-4 cursor-pointer justify-between
                ${!selected ? "bg-[#F2F4F7]" : "bg-[#E1F0D0]"}
              `}
    >
      <div className="flex justify-between items-center">
        <p className="text-[#04A76C] text-sm font-inter font-bold">
          {option?.name}
        </p>
        <p className="text-black-900 font-inter text-sm">
          Save up to {option?.name?.includes("5") ? "20" : "30"}%
        </p>
      </div>

      <h3 className="font-NewSpiritBold  text-[2.5rem] text-[#323546]">
        {option?.name?.includes("5")
          ? "10 Meals"
          : option.name?.includes("MONTHLY")
          ? "56 Meals"
          : "14 Meals"}
        {/* {option?.name} */}
      </h3>
      <div>
        <p className="text-black-900 font-inter text-base">
          {/* £{perMealPrice}/meal £{option?.amount}/meal */}
          {option?.description}
        </p>

        <p className="text-black-900 font-inter tracking-[-0.01688rem] leading-[1.6875rem]">
          <span>Total: </span>
          <span className="font-bold">
            {/* @ts-ignore */}
            £{option?.amount + option?.delivery_fee}
          </span>
        </p>
      </div>

      {/* <div className="flex items-center gap-1">
        <Checkbox
          checked={isWeekend && selected}
          onSelect={() => {
            setIsWeekend(!isWeekend);
          }}
        />
        <p>Weekend delivery (+£8)</p>
      </div> */}
    </div>
  );
};
const MealPlanSelection = ({ onAfrican }: { onAfrican?: boolean }) => {
  const [activeOptionIndex, setActiveOptionIndex] = useState(1);
  const { getAxiosClient } = useAuth();
  const [options, setOptions] = useState<IPlan[]>([]);
  const router = useRouter();
  const activeSearchContinent = useMemo(
    () => (onAfrican ? CONTINENTS[0] : CONTINENTS[1]),
    [onAfrican]
  );
  const [isWeekend, setIsWeekend] = useState(false);
  const { getUser } = useUser();
  const [user, setUser] = useState<undefined | IUser>(undefined);

  const getPlans = () => {
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);
    return axiosClient.get(
      `plans?continent=${activeSearchContinent?.search}&weekend=${isWeekend}`
    );
  };
  //${activeSearchContinent.noun}
  const { data, isLoading } = useQuery(
    [queryKeys.GET_PLANS, activeSearchContinent?.search, isWeekend],
    getPlans
  );

  const sortPlans = useMemo(() => {
    const containsNumber = (str?: string): boolean => /\d/.test(str ?? "");
    options.sort((a, b) => {
      if (containsNumber(a?.name) && !containsNumber(b?.name)) {
        return -1;
      } else if (!containsNumber(a?.name) && containsNumber(b?.name)) {
        return 1;
      } else {
        //@ts-ignore
        return onAfrican
          ? //@ts-ignore
            b.name.localeCompare(a.name)
          : //@ts-ignore
            a.name.localeCompare(b.name);
      }
    });
    return options;
  }, [options, onAfrican]);

  useEffect(() => {
    if (data?.data?.data?.data) {
      setOptions(data?.data?.data?.data);
    }
  }, [data]);

  useEffect(() => {
    setUser(getUser());
  }, []);

  useEffect(() => {
    if (!onAfrican) setIsWeekend(false);
  }, [onAfrican]);

  return (
    <>
      <title>
        Best African, Asian and European Meal Plans & Delivery in the UK |
        Nourisha
      </title>
      <meta
        name="description"
        content="Discover a wide range of freshly-cooked Nigerian, African, Asian and European meal plans from NOURISHA- Meal prep & food delivery service in the UK. Lunch & Dinner  meals delivered from less than £100/week . Choose your meals and order now."
      />
      <div className="mx-1.25 md:mx-[2rem] my-6">
        {isLoading && (
          <div className="flex justify-center items-center w-full">
            <p className="text-center font-inter text-sm">Loading...</p>
          </div>
        )}
        {onAfrican && (
          <div className="flex items-center gap-1 justify-center my-3 mt-4">
            <p>Weekend delivery (+£8)</p>

            <ReactSwitch
              checkedIcon={<></>}
              uncheckedIcon={<></>}
              id="switch"
              checked={isWeekend}
              onChange={setIsWeekend}
            />
          </div>
        )}
        <div className="grid grid-cols-1 md:flex gap-4">
          {sortPlans.map((option, index) => {
            return (
              <SinglePlan
                option={option}
                onAfrican={onAfrican}
                index={index}
                isWeekend={isWeekend}
                setIsWeekend={setIsWeekend}
                activeOptionIndex={activeOptionIndex}
                setActiveOptionIndex={setActiveOptionIndex}
                key={`meal_selection_${index}`}
              />
            );
          })}
        </div>

        {/* <p className="text-black-900 text-xl text-center font-inter my-4">
          <span className="text-base">Free weekday delivery</span> and £8 for
          weekend delivery
        </p> */}

        {!isLoading && (
          <div className="flex justify-center items-center mt-4 ">
            <Button
              variant="primary"
              className="h-[2.7rem] py-6  w-full md:w-auto"
              onClick={() => {
                if (user?.email) {
                  router.push(
                    `/food_box?plan=${
                      options.find((o, i) => i === activeOptionIndex)?.name
                    }&plan_id=${
                      options.find((o, i) => i === activeOptionIndex)?._id
                    }&search_continent=${
                      activeSearchContinent?.search
                    }&isWeekend=${isWeekend}&plan_amount=${
                      options.find((o, i) => i === activeOptionIndex)?.amount
                    }&deliveryFee=${
                      options.find((o, i) => i === activeOptionIndex)
                        ?.delivery_fee
                    }
                    `
                  );
                } else {
                  router.push("/auth");
                }
              }}
              title="Continue"
            />
          </div>
        )}
      </div>
    </>
  );
};
export default function MealPlan() {
  const [orderTypeModal, setShowOrderTypeModal] = useState(false);
  const searchParams = useSearchParams();
  const [onAfrican, setOnAfrican] = useState(
    searchParams?.get("onAsian") && searchParams?.get("onAsian") === "1"
      ? false
      : true
  );

  return (
    <div className="w-full h-full relative pt-6">
      <Navbar />
      <Modal close={() => setShowOrderTypeModal(false)} show={orderTypeModal}>
        <SelectOrdertypeModalSection
          close={() => setShowOrderTypeModal(false)}
        />
      </Modal>
      <div className="flex flex-col gap-6 mt-32">
        <h3 className="text-center font-NewSpiritBold text-primary-Green-900 text-[2rem] md:text-[4.5rem]">
          Meal Plans
        </h3>
        <h4 className="text-center font-NewSpiritBold text-black-900 text-[2rem] mx-auto w-4/5 md:w-full md:text-[3.5rem]">
          Select your custom meal plan
        </h4>
        <p className="text-black-900 font-inter text-lg text-center w-full md:w-3/5 mx-auto font-semibold">
          Prep your daily meals to maintain healthy eating habits.
        </p>

        <div className="flex justify-center ">
          <div className="bg-[#F2F4F7] flex w-[97%] md:w-[30.4375rem] h-[2.5rem] rounded-[2rem] overflow-hidden font-inter text-base cursor-pointer">
            <p
              onClick={() => setOnAfrican(true)}
              className={`
            text-center flex-1 flex justify-center items-center text-sm md:text-base
              ${
                onAfrican
                  ? "bg-[#E1F0D0] border-[#7DB83A] border-[0.5px] rounded-[2rem] text-[#008000] "
                  : ""
              }
              `}
            >
              African Meal Plans
            </p>
            <p
              onClick={() => setOnAfrican(false)}
              className={`
                text-center flex-1 flex justify-center items-center text-sm md:text-base
                  ${
                    !onAfrican
                      ? "bg-[#E1F0D0] border-[#7DB83A] border-[0.5px] rounded-[2rem] text-[#008000] "
                      : ""
                  }
                  `}
            >
              Asian & European Meal Plans
            </p>
          </div>
        </div>
        <div className="w-full md:w-full mx-auto">
          <MealPlanSelection onAfrican={onAfrican} />
        </div>

        <div className="w-full">
          <img src="/images/zigzag.png" className="w-full" />
        </div>
        <div className="mt-8 mx-1.25 md:mx-6.25">
          <DownloadTheAppWidgetSection />
        </div>
        <div className="mt-[5rem] mx-1.25 md:mx-[4rem]">
          <Footer />
        </div>
      </div>
    </div>
  );
}
