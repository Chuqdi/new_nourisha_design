"use client";
import Navbar from "@/components/commons/Navbar";
import MealSelectionSection from "@/components/sections/MealSelectionSection";
import DeliveryModal from "@/components/sections/Modals/DeliveryModal";
import Button from "@/components/ui/Button";
import { COUNTRIES, DAYS_OF_THE_WEEK } from "@/config";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AnimatePresence, motion } from "framer-motion";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";

const WeeksBreakDown = () => {
  return (
    <div className="flex flex-col gap-4">
      {DAYS_OF_THE_WEEK.map((week, index) => {
        const [showBreakdown, setShowBreakdown] = useState(false);

        return (
          <div
            onClick={() => setShowBreakdown((value) => !value)}
            key={`weeek_break_down_${index}`}
            className="border-b pb-4 cursor-pointer h-fit"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-inter text-[#323546] text-base font-bold tracking-[-0.015rem] leading-[1.5rem]">
                {week}
              </h4>
              {showBreakdown ? (
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
              )}
            </div>

            <AnimatePresence>
              {showBreakdown && (
                <motion.div
                  initial={{ y: -5 }}
                  exit={{ y: -5 }}
                  animate={{ y: 0 }}
                  className="mt-2"
                >
                  <div className="flex flex-col gap-1">
                    <h5 className="text-black-900 font-inter text-sm tracking-[-0.01313rem] leading-[1.3125rem] font-semibold">
                      Breakfast
                    </h5>
                    <p className="text-black-900 text-sm font-inter tracking-[-0.01313rem] leading-[1.3125rem]">
                      Jollof Rice, Peppered Beef, Fried Plantain Side
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h5 className="text-black-900 font-inter text-sm tracking-[-0.01313rem] leading-[1.3125rem] font-semibold">
                      Dinner
                    </h5>
                    <p className="text-black-900 text-sm font-inter tracking-[-0.01313rem] leading-[1.3125rem]">
                      Jollof Rice, Peppered Beef, Fried Plantain Side
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export const SelectChip = ({
  title,
  selected,
  onClick,
}: {
  selected: boolean;
  title: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center h-[3rem] rounded-[2rem] py-[0.4375rem] px-[0.75rem] text-black-900 text-lg font-inter tracking-[-0.01688rem] leading-[1.687rem] gap-2 w-fit ${
        selected ? "bg-[#E1F0D0]" : "bg-[#F2F4F7]"
      }`}
    >
      {title}
      {selected ? (
        <Icon
          color="#7DB83A"
          className="w-4 h-4"
          icon="streamline:check-solid"
        />
      ) : (
        <Icon color="#030517" className="w-4 h-4" icon="mingcute:add-fill" />
      )}
    </button>
  );
};
export default function foodboxPage() {
  const navigation = useRouter();
  const [activeCountry, setActiveCountry] = useState(COUNTRIES[0]);
  const [activeWeek, setActiveWeek] = useState(DAYS_OF_THE_WEEK[0]);
  const setSideModal = useSetAtom(ATOMS.showSideModal);
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
            <div className="grid grid-cols-2 md:grid-cols-4  gap-5 w-fit">
              {COUNTRIES.map((country, index) => {
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

            <div className="grid grid-cols-2 md:grid-cols-7  gap-5 w-fit">
              {DAYS_OF_THE_WEEK.map((week, index) => {
                const selected = week === activeWeek;
                return (
                  <SelectChip
                    onClick={() => setActiveWeek(week)}
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
                  <MealSelectionSection
                    colCountClass="md:grid-cols-3"
                    onlyMeals
                  />
                </div>
                <div className="w-full md:w-[30%] rounded-[0.75rem] mt-4 bg-[#F2F4F7] py-4 px-3 flex flex-col gap-3 mb-8">
                  <h4 className="text-[#323546] text-[1.5rem] font-NewSpiritBold">
                    Plan summary
                  </h4>

                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-[0.375rem] bg-[#D9D9D9]">
                        <div className="w-[50%] h-full bg-[#04A76C]" />
                      </div>
                      <p className="text-black-900 font-inter text-sm tracking-[-0.01313rem] leading-[1.3125rem]">
                        1/7
                      </p>
                    </div>
                    <p className="text-black-900 text-sm font-inter tracking-[-0.0131313rem] leading-[1.3125rem]">
                      Add 6 more days to complete your plan
                    </p>
                  </div>

                  <WeeksBreakDown />

                  <Button
                    onClick={() =>
                      setSideModal({
                        show: true,
                        component: <DeliveryModal />,
                      })
                    }
                    fullWidth
                    title="Proceed"
                    variant="primary"
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
