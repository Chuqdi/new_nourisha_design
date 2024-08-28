"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import SelectOrdertypeModalSection from "@/components/sections/Modals/SelectordertypeModalSection";
import Button from "@/components/ui/Button";
import MessageBtn from "@/components/ui/MessageBtn";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

export const SelectIndicator = ({ selected }: { selected: boolean }) => {
  return (
    <button
      className={`
          flex items-center rounded-[0.37rem] h-[1.5rem] p-2 gap-2
          ${selected ? "bg-[#1AA34A]" : "bg-white"}

          `}
    >
      <p
        className={` font-inter text-[0.75rem] leading-[1.125rem] tracking-[-0.00875rem] ${
          selected ? "text-white" : "text-black-900"
        }`}
      >
        Select
      </p>
      <div
        className={`w-[1.125rem] h-[1.125rem] rounded-full border-[1px] 
    ${!selected ? "border-[#323546]" : "border-white"}
      
      `}
      />
    </button>
  );
};

const SinglePlan = ({
  activeOptionIndex,
  index,
  setActiveOptionIndex,
  option,
}: {
  activeOptionIndex: number;
  index: number;
  setActiveOptionIndex: (value: number) => void;
  option: {
    advertisement: string;
    title: string;
    price: string;
    total: string;
  };
}) => {
  const selected = activeOptionIndex === index;

  return (
    <div
      onClick={() => setActiveOptionIndex(index)}
      className={`p-6 rounded-[0.75rem] flex-1 flex flex-col gap-8 cursor-pointer
                ${!selected ? "bg-[#F2F4F7]" : "bg-[#E1F0D0]"}
              `}
    >
      <div className="flex justify-between items-center">
        <p>{option.advertisement}</p>
        <SelectIndicator selected={selected} />
      </div>
      <h3 className="font-NewSpiritBold text-2xl md:text-[3rem] text-[#323546]">
        {option.title}
      </h3>
      <div>
        <p className="text-black-900 font-inter tracking-[-0.01688rem] leading-[1.6875rem]">
          {option.price}
        </p>
        <p className="font-inter text-lg tracking-[-0.01688rem] leading-[1.6875rem]">
          Total: <span className="font-semibold">{option.total}</span>
        </p>
      </div>
    </div>
  );
};
const MealPlanSelection = () => {
  const [activeOptionIndex, setActiveOptionIndex] = useState(1);
  const options = [
    {
      advertisement: "Cheapest",
      title: "6 meals",
      price: "£6.55/meal",
      total: "£39.33",
    },
    {
      advertisement: "",
      title: "8 meals",
      price: "£6.55/meal",
      total: "£39.33",
    },
    {
      advertisement: "Save 20%",
      title: "10 meals",
      price: "5 day weekly plan",
      total: "£70",
    },
    {
      advertisement: "Save 30%",
      title: "14 meals",
      price: "7 day weekly plan",
      total: "£120",
    },
  ];
  return (
    <div className="grid grid-cols-2 md:flex gap-3">
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
        <div className="mx-1.25 md:mx-6.25 my-6">
          <MealPlanSelection />
          <div className="flex justify-center items-center my-14 w-full md:w-[20%] mx-auto">
            <Button
              onClick={() => setShowOrderTypeModal(true)}
              fullWidth
              title="Continue"
              variant="primary"
            />
          </div>
        </div>

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
