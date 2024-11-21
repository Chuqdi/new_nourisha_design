"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import MealSelectionSection from "@/components/sections/MealSelectionSection";
import Image from "next/image";


export default function Main() {
  
  return (
    <>
     <title>
     Bulk Meal Order | Meal  Prep & Food Delivery  Services in UK | Nourisha
      </title>
      <meta
        name="description"
        content="Hosting an event or just stocking up? Order meals in bulk from NOURISHA in the UK. Browse  & select from a wide range of African, Asian & European healthy meals delivered fresh across the UK."
      />
    <div
      className={`
      w-full h-full relative pt-6
      `}
    >
      <Navbar />
      <div className="flex flex-col gap-6 mt-32">
        <h1 className="text-center font-NewSpiritBold text-primary-Green-900 text-[2rem] md:text-[4.5rem]">
          Bulk Meal Orders
        </h1>

        <p className="text-black-900 font-inter text-lg text-center  w-4/5 md:w-2/5 mx-auto">
          Hosting an event or just stocking up? Order in bulk and get large
          quantities of your favorite dishes.
        </p>
      </div>
      <div className="mt-8 mx-1.25 md:mx-6.25">
        <MealSelectionSection 
          colCountClass={"md:grid-cols-3 grid-cols-1"}
          isSingle
        />
      </div>
      <div className="w-full mt-6.25">
        <Image width={500} height={500} alt="" src="/images/zigzag.png" className="w-full" />
      </div>
      <div className="mt-20 mx-1.25 md:mx-6.25">
        <DownloadTheAppWidgetSection />
      </div>

      <div className="mt-[5rem] mx-1.25 md:mx-6.25">
        <Footer />
      </div>
    </div>
    </>
  );
}
