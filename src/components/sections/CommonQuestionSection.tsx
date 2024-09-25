"use client";
import FaqSection from "./FaqSection";

export default function CommonQuestionsSection() {
  return (
    <div className="-my-10 md:my-[5rem] mx-0 md:mx-6.25  ">
      <div className="bg-background2 rounded-none md:rounded-[2.5rem] h-[17.875rem] flex flex-col  items-center pt-[2.5rem]">
        <h4 className="text-black-900 font-NewSpiritBold text-[2rem]">
          Common Questions
        </h4>
        <p className="text-black-900 font-inter text-base text-center">
          Need something cleared up? Here are our most frequently asked
          questions{" "}
        </p>
      </div>

      <div className="mx-auto w-[95%] md:w-[80%] -mt-32 md:-mt-40 p-3 md:p-[2.75rem] bg-white rounded-[0.75rem] ">
        <FaqSection />
      </div>
    </div>
  );
}
