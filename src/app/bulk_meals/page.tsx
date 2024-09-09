"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import MealSelectionSection from "@/components/sections/MealSelectionSection";
import MessageBtn from "@/components/ui/MessageBtn";

export default function BulkMealPage() {

  return (
    <div
      className={`
      w-full h-full relative pt-6
      `}
    >
      <Navbar />
      <div className="flex flex-col gap-6 mt-32">
        <MessageBtn title="OUR MEAL PLANS" />
        <h3 className="text-center font-NewSpiritBold text-primary-Green-900 text-[2rem] md:text-[4.5rem]">
          Bulk Meal Orders
        </h3>

        <p className="text-black-900 font-inter text-lg text-center  w-full md:w-2/5 mx-auto">
          Hosting an event or just stocking up? Order in bulk and get large
          quantities of your favorite dishes.
        </p>
      </div>
      <div className="mt-8 mx-1.25 md:mx-6.25">
        <MealSelectionSection />
      </div>
      <div className="w-full mt-6.25">
        <img src="/images/zigzag.png" className="w-full" />
      </div>
      <div className="mt-20 mx-1.25 md:mx-6.25">
        <DownloadTheAppWidgetSection />
      </div>

      <div className="mt-[5rem] mx-1.25 md:mx-6.25">
        <Footer />
      </div>
    </div>
  );
}
