"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import SelectOrdertypeModalSection from "@/components/sections/Modals/SelectordertypeModalSection";
import Button from "@/components/ui/Button";
import MessageBtn from "@/components/ui/MessageBtn";
import Modal from "@/components/ui/Modal";
import SelectIndicator from "@/components/ui/SelectIndicator";
import queryKeys from "@/config/queryKeys";
import { IPlan } from "@/config/types";
import { UserContext } from "@/HOC/UserContext";
import useAuth from "@/hooks/useAuth";
import { toast } from "@/ui/use-toast";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

const SinglePlan = ({
  activeOptionIndex,
  index,
  setActiveOptionIndex,
  option,
}: {
  activeOptionIndex: number;
  index: number;
  setActiveOptionIndex: (value: number) => void;
  option: IPlan;
}) => {
  const selected = activeOptionIndex === index;

  return (
    <div
      onClick={() => setActiveOptionIndex(index)}
      className={`p-6 rounded-[0.75rem] flex-1 flex flex-col gap-4 cursor-pointer
                ${!selected ? "bg-[#F2F4F7]" : "bg-[#E1F0D0]"}
              `}
    >
      <div className="flex justify-between items-center">
        <SelectIndicator selected={selected} />
      </div>
      <h3 className="font-NewSpiritBold text-2xl md:text-[1.5rem] text-[#323546]">
        {option.name}
      </h3>
      <div>
        <p className="text-black-900 font-inter tracking-[-0.01688rem] leading-[1.6875rem]">
          £{option.amount}
        </p>
      </div>
    </div>
  );
};
const MealPlanSelection = ({
  setShowOrderTypeModal,
}: {
  setShowOrderTypeModal: (value: boolean) => void;
}) => {
  const [activeOptionIndex, setActiveOptionIndex] = useState(1);
  const { axiosClient } = useAuth();
  const user = useContext(UserContext);
  const [options, setOptions] = useState<IPlan[]>([]);
  const router = useRouter();
  const getPlans = () => {
    return axiosClient.get("plans?country=nigeria&weekend=false");
  };

  const { data, isLoading } = useQuery(queryKeys.GET_PLANS, getPlans);

  useEffect(() => {
    if (data?.data?.data?.data) {
      setOptions(data?.data?.data?.data);
    }
  }, [data]);


  useEffect(()=>{
    if(!user?.user?._id){
      toast({
        title:"Authentication",
        variant:"destructive",
        description:"Please sign in to continue."
      })
      router.push("/auth");
    }
  }, [ ])
  return (
    <div className="mx-1.25 md:mx-6.25 my-6">
      <div className="grid grid-cols-2 md:flex gap-3">
        {isLoading && (
          <div className="flex justify-center items-center w-full">
            <p className="text-center font-inter text-sm">Loading...</p>
          </div>
        )}
        {options.map((option, index) => {
          return (
            <SinglePlan
              option={option}
              index={index}
              activeOptionIndex={activeOptionIndex}
              setActiveOptionIndex={setActiveOptionIndex}
              key={`meal_selection_${index}`}
            />
          );
        })}
      </div>
      {!isLoading && (
        <div className="flex justify-center items-center my-14 w-full md:w-[20%] mx-auto">
          <Button
            // onClick={() => setShowOrderTypeModal(true)}
            onClick={() => {
              router.push(`
                /food_box?plan=${
                  options.find((_, i) => i === activeOptionIndex)?.name
                }
                `);
            }}
            fullWidth
            title="Continue"
            variant="primary"
          />
        </div>
      )}
    </div>
  );
};
export default function MealPlan() {
  const [orderTypeModal, setShowOrderTypeModal] = useState(false);

  return (
    <div className="w-full h-full relative pt-6">
      <Navbar />
      <Modal show={orderTypeModal}>
        <SelectOrdertypeModalSection
          close={() => setShowOrderTypeModal(false)}
        />
      </Modal>
      <div className="flex flex-col gap-6 mt-32">
        <MessageBtn title="OUR MEAL PLANS" />
        <h3 className="text-center font-NewSpiritBold text-primary-Green-900 text-[2rem] md:text-[4.5rem]">
          Meal Plans
        </h3>
        <h4 className="text-center font-NewSpiritBold text-black-900 text-[2rem] mx-auto w-3/5 md:w-full md:text-[3.5rem]">
          How many meals would you like?
        </h4>
        <p className="text-black-900 font-inter text-lg text-center w-full md:w-3/5 mx-auto">
          We would like to know your preference regarding the number of meals
          you would like to receive in your Nourisha FoodBox.{" "}
        </p>
        <MealPlanSelection setShowOrderTypeModal={setShowOrderTypeModal} />

        <div className="w-full">
          <img src="/images/zigzag.png" className="w-full" />
        </div>
        <div className="mt-8 mx-1.25 md:mx-6.25">
          <DownloadTheAppWidgetSection />
        </div>
        <div className="mt-[5rem] mx-1.25 md:mx-6.25">
          <Footer />
        </div>
      </div>
    </div>
  );
}
