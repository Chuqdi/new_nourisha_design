"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import SelectOrdertypeModalSection from "@/components/sections/Modals/SelectordertypeModalSection";
import Button from "@/components/ui/Button";
import MessageBtn from "@/components/ui/MessageBtn";
import Modal from "@/components/ui/Modal";
import { CONTINENTS } from "@/config";
import queryKeys from "@/config/queryKeys";
import { IPlan } from "@/config/types";
import { UserContext } from "@/HOC/UserContext";
import useAuth from "@/hooks/useAuth";
import { DEVICE_ID } from "@/hooks/useFingerPrint";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

const SinglePlan = ({
  activeOptionIndex,
  index,
  setActiveOptionIndex,
  option,
  onAfrican,
}: {
  activeOptionIndex: number;
  index: number;
  setActiveOptionIndex: (value: number) => void;
  option: IPlan;
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
  const totalPrice = useMemo(() => {
    if (option?.name?.includes("5")) {
      return onAfrican ? option?.amount : "71";
    } else if (option.name?.includes("MONTHLY")) {
      return onAfrican ? option?.amount : "383.06";
    }
    return onAfrican ? option?.amount : "95.09";
  }, [onAfrican]);
  return (
    <div
      onClick={() => setActiveOptionIndex(index)}
      className={`p-4 rounded-[0.75rem] flex-1 flex flex-col gap-4 cursor-pointer
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

      <h3 className="font-NewSpiritBold  text-[3rem] text-[#323546]">
        {option?.name?.includes("5")
          ? "10 Meals"
          : option.name?.includes("MONTHLY")
          ? "56 Meals"
          : "14 Meals"}
      </h3>
      <div>
        <p className="text-black-900 font-inter text-base">
          £{perMealPrice}/meal
        </p>
        <p className="text-black-900 font-inter tracking-[-0.01688rem] leading-[1.6875rem]">
          <span>Total: </span>
          <span className="font-bold">£{totalPrice}</span>
        </p>
      </div>
    </div>
  );
};
const MealPlanSelection = ({ onAfrican }: { onAfrican?: boolean }) => {
  const [activeOptionIndex, setActiveOptionIndex] = useState(1);
  const { getAxiosClient } = useAuth();
  const user = useContext(UserContext);
  const [options, setOptions] = useState<IPlan[]>([]);
  const router = useRouter();
  const activeSearchContinent = useMemo(
    () => (onAfrican ? CONTINENTS[0] : CONTINENTS[1]),
    [onAfrican]
  );
  const getPlans = () => {
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);
    return axiosClient.get(`plans?continent=African`);
  };
  //${activeSearchContinent.noun}
  const { data, isLoading } = useQuery(queryKeys.GET_PLANS, getPlans);

  useEffect(() => {
    if (data?.data?.data?.data) {
      setOptions(data?.data?.data?.data?.reverse());
    }
  }, [data]);

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
      <div className="mx-1.25 md:mx-6.25 my-6">
        <div className="grid grid-cols-1 md:flex gap-4">
          {isLoading && (
            <div className="flex justify-center items-center w-full">
              <p className="text-center font-inter text-sm">Loading...</p>
            </div>
          )}
          {options.map((option, index) => {
            return (
              <SinglePlan
                option={option}
                onAfrican={onAfrican}
                index={index}
                activeOptionIndex={activeOptionIndex}
                setActiveOptionIndex={setActiveOptionIndex}
                key={`meal_selection_${index}`}
              />
            );
          })}
        </div>

        {!isLoading && (
          <div className="flex justify-center items-center mt-4 ">
            <Button
              variant="primary"
              // onClick={()=>router.push(`/food_box?plan?${options.find(o:IPlan,i)=> o.}`)}
              className="h-[2.7rem] py-6  w-full md:w-auto"
              onClick={() => {
                router.push(
                  `/food_box?plan=${
                    options.find((o, i) => i === activeOptionIndex)?.name
                  }&plan_id=${
                    options.find((o, i) => i === activeOptionIndex)?._id
                  }&search_continent=${activeSearchContinent?.search}`
                );
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
  const [onAfrican, setOnAfrican] = useState(true);

  return (
    <div className="w-full h-full relative pt-6">
      <Navbar />
      <Modal show={orderTypeModal}>
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
