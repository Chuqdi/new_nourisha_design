"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import SelectOrdertypeModalSection from "@/components/sections/Modals/SelectordertypeModalSection";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { CONTINENTS } from "@/config";
import queryKeys from "@/config/queryKeys";
import { IPlan } from "@/config/types";
import useAuth from "@/hooks/useAuth";
import { DEVICE_ID } from "@/hooks/useFingerPrint";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { UserContext } from "@/HOC/UserContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import useDeliveryDate from "@/hooks/useDeliveryDate";
import { Switch } from "@/components/ui/Switch";
import { Loader2 } from "lucide-react";

// Constants
const WEEKEND_STORAGE_KEY = "nourisha_weekend_delivery";
const CONTINENT_STORAGE_KEY = "nourisha_selected_continent";

const SinglePlan = ({
  activeOptionIndex,
  index,
  onMealPlanClicked,
  option,
  isWeekend,
}: {
  activeOptionIndex: number;
  index: number;
  onMealPlanClicked: (value: number) => void;
  option: IPlan;
  isWeekend: boolean;
}) => {
  const selected = activeOptionIndex === index;

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onMealPlanClicked(index);
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

      <h3 className="font-NewSpiritBold text-[2.5rem] text-[#323546]">
        {option?.name?.includes("5")
          ? "10 Meals"
          : option.name?.includes("MONTHLY")
          ? "56 Meals"
          : "14 Meals"}
      </h3>
      <div>
        <p className="text-black-900 font-inter text-base">
          {option?.description}
        </p>

        <p className="text-black-900 font-inter tracking-[-0.01688rem] leading-[1.6875rem]">
          <span>Total: </span>
          {/* @ts-ignore */}
          <span className="font-bold">
            £{option?.amount + option?.delivery_fee}
          </span>
        </p>
      </div>
    </div>
  );
};

const MealPlanSelection = ({ onAfrican }: { onAfrican?: boolean }) => {
  const { getAxiosClient } = useAuth();
  const router = useRouter();
  const { user } = useContext(UserContext);
  const {
    data: deliveryData,
    isLoading: deliveryLoading,
    convertDateFormat,
  } = useDeliveryDate();

  // Persist weekend state with local storage
  const [isWeekend, setIsWeekend] = useState(() => {
    const storedWeekendState = localStorage.getItem(WEEKEND_STORAGE_KEY);
    return storedWeekendState ? JSON.parse(storedWeekendState) : false;
  });

  // Update local storage when weekend state changes
  useEffect(() => {
    localStorage.setItem(WEEKEND_STORAGE_KEY, JSON.stringify(isWeekend));
  }, [isWeekend]);

  const [activeOptionIndex, setActiveOptionIndex] = useState(1);
  const [checkingSubstate, setCheckingSubstate] = useState(true);
  const [options, setOptions] = useState<IPlan[]>([]);

  const activeSearchContinent = useMemo(
    () => (onAfrican ? CONTINENTS[0] : CONTINENTS[1]),
    [onAfrican]
  );

  const getPlans = useCallback(() => {
    const id = localStorage.getItem(DEVICE_ID);
    const axiosClient = getAxiosClient(id!);
    return axiosClient.get(
      `plans?continent=${activeSearchContinent?.search}&weekend=${isWeekend}`
    );
  }, [activeSearchContinent, isWeekend, getAxiosClient]);

  const { data, isLoading } = useQuery(
    [queryKeys.GET_PLANS, activeSearchContinent?.search, isWeekend],
    getPlans
  );

  // Optimized plan sorting
  const sortPlans = useMemo(() => {
    const containsNumber = (str?: string): boolean => /\d/.test(str ?? "");
    return [...options].sort((a, b) => {
      if (containsNumber(a?.name) && !containsNumber(b?.name)) return -1;
      if (!containsNumber(a?.name) && containsNumber(b?.name)) return 1;
      return isWeekend
        ? // @ts-ignore
          b?.name.localeCompare(a?.name)
        : // @ts-ignore
          a?.name.localeCompare(b?.name);
    });
  }, [options, isWeekend]);

  const onContinue = useCallback(
    (plan: IPlan) => {
      router.push(
        `/food-box?plan=${plan?.name}&plan_id=${plan?._id}&search_continent=${activeSearchContinent?.search}&isWeekend=${isWeekend}&plan_amount=${plan?.amount}&deliveryFee=${plan?.delivery_fee}&date=${deliveryData?.data?.data}`
      );
    },
    [router, activeSearchContinent, isWeekend, deliveryData]
  );

  const onMealPlanClicked = useCallback(
    (index: number) => {
      if (index === activeOptionIndex) {
        const selectedPlan = options.find((o, i) => i === activeOptionIndex);
        if (selectedPlan) onContinue(selectedPlan);
      } else {
        setActiveOptionIndex(index);
      }
    },
    [activeOptionIndex, options, onContinue]
  );

  const checkSub = useCallback(async () => {
    if (user?.email) {
      const id = localStorage.getItem(DEVICE_ID);
      const axiosClient = getAxiosClient(id!);
      try {
        const { data } = await axiosClient.get("subscriptions/me");
        if (!data?.data?.used_sub && data?.data?.status === "active") {
          onContinue(data?.data?.plan);
        }
      } catch (e) {
        console.error("Subscription check failed", e);
      } finally {
        setCheckingSubstate(false);
      }
    } else {
      setCheckingSubstate(false);
    }
  }, [user, getAxiosClient, onContinue]);

  useEffect(() => {
    checkSub();
  }, [checkSub]);

  useEffect(() => {
    if (data?.data?.data?.data) {
      setOptions(data?.data?.data?.data);
    }
  }, [data]);

  // Reset weekend state when continent changes
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
        content="Discover a wide range of African, Asian and European meal plans from NOURISHA- Meal prep & delivery in the UK.  Get meals for up to 7days , starting form £80/week . Choose your meals and order now.
"
      />
      <div className="mx-1.25 md:mx-[2rem] my-6">
        {isLoading && (
          <div className="flex justify-center items-center w-full my-4">
            <p className="text-center">
              <Loader2 size={20} className="animate-spin" />
            </p>
          </div>
        )}

        {!checkingSubstate && !isLoading && onAfrican && (
          <div className="flex items-center gap-2 justify-center my-3 mt-4">
            <p className="text-sm">Weekend delivery (+£8)</p>
            <Switch
              checked={isWeekend}
              onCheckedChange={(checked) => {
                setIsWeekend(checked);
                localStorage.setItem(
                  WEEKEND_STORAGE_KEY,
                  JSON.stringify(checked)
                );
              }}
              aria-label="Toggle weekend delivery"
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:flex gap-4">
          {!checkingSubstate &&
            sortPlans.map((option, index) => (
              <SinglePlan
                key={`meal_selection_${index}`}
                option={option}
                index={index}
                activeOptionIndex={activeOptionIndex}
                onMealPlanClicked={onMealPlanClicked}
                isWeekend={isWeekend}
              />
            ))}
        </div>

        {/* Delivery Date Section */}
        {!onAfrican && (
          <div className="w-full flex flex-col justify-center">
            <p className="text-center font-inter text-sm mt-2">DELIVERY DATE</p>
            <div className="rounded-[0.75rem] mx-auto bg-[#DEF54C] text-center p-4 font-NewSpiritBold text-2xl">
              {deliveryLoading ? (
                <Icon
                  color="#000"
                  icon="eos-icons:loading"
                  className="w-6 h-6 mx-auto"
                />
              ) : (
                convertDateFormat(deliveryData?.data?.data)
              )}
            </div>
          </div>
        )}

        {/* Continue Button */}
        {!checkingSubstate && !isLoading && (
          <div className="flex justify-center items-center mt-4">
            <Button
              variant="primary"
              className="h-[2.7rem] py-6 w-full md:w-auto"
              onClick={() => {
                const selectedPlan = options.find(
                  (o, i) => i === activeOptionIndex
                );
                if (user?.email && selectedPlan) {
                  onContinue(selectedPlan);
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
  const searchParams = useSearchParams();
  const [orderTypeModal, setShowOrderTypeModal] = useState(false);

  // Persist continent selection in local storage
  const [onAfrican, setOnAfrican] = useState(() => {
    const storedContinent = localStorage.getItem(CONTINENT_STORAGE_KEY);
    if (storedContinent !== null) {
      return JSON.parse(storedContinent);
    }
    return searchParams?.get("onAsian") && searchParams?.get("onAsian") === "1"
      ? false
      : true;
  });

  // Update local storage when continent changes
  useEffect(() => {
    localStorage.setItem(CONTINENT_STORAGE_KEY, JSON.stringify(onAfrican));
  }, [onAfrican]);

  return (
    <div className="w-full h-full relative pt-6">
      <Navbar />
      <Modal close={() => setShowOrderTypeModal(false)} show={orderTypeModal}>
        <SelectOrdertypeModalSection
          close={() => setShowOrderTypeModal(false)}
        />
      </Modal>

      <div className="flex flex-col gap-6 mt-32">
        <h1 className="text-center font-NewSpiritBold text-primary-Green-900 text-[2rem] md:text-[4.5rem]">
          Meal Plans
        </h1>
        <h4 className="text-center font-NewSpiritBold text-black-900 text-[2rem] mx-auto w-4/5 md:w-full md:text-[3.5rem]">
          Select your custom meal plan
        </h4>
        <p className="text-black-900 font-inter text-lg text-center w-full md:w-3/5 mx-auto font-semibold">
          Prep your daily meals to maintain healthy eating habits.
        </p>

        <div className="flex justify-center">
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
