import FaqSection from "./FaqSection";

export default function CommonQuestionsSection() {
  return (
    <div className="my-[5rem] mx-0 md:mx-6.25  ">
      <div className="bg-background2 rounded-[2.5rem] h-[17.875rem] flex flex-col  items-center pt-[2.5rem]">
        <h4 className="text-black-900 font-NewSpiritBold text-[2rem]">
          Common Questions
        </h4>
        <p className="text-black-900 font-inter text-base text-center">
          Need something cleared up? Here are our most frequently asked
          questions{" "}
        </p>
      </div>

      <div className="mx-auto w-full md:w-[80%] -mt-20 md:-mt-40 px-1.25 md:p-[2.75rem] ">
        <FaqSection />
      </div>
    </div>
  );
}
