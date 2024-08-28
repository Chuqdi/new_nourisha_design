"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import CommonQuestionsSection from "@/components/sections/CommonQuestionSection";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import FaqSection from "@/components/sections/FaqSection";
import MessageBtn from "@/components/ui/MessageBtn";

export default function FaqPage() {
  return (
    <div className="w-full h-full relative pt-6 ">
      <Navbar />
      <div className="bg-[#F3F9EC]">
        <div className="py-44 mx-auto w-full md:w-[52.375rem] ">
          <MessageBtn title="SEE COMMON QUESTIONS" />
          <h3 className="text-[#7DB83A] text-center font-NewSpiritBold text-[2rem] md:text-[4.5rem]">
            Frequently asked questions
          </h3>
        </div>
      </div>
      <img src="/images/zigzag.png" className="w-full -mt-2 md:-mt-8" />
      <div className="mx-1.25 md:mx-6.25 mt-[5rem]">
        <FaqSection />
      </div>
      <div className="mt-[5rem]" />
      <DownloadTheAppWidgetSection />
      <div className="mt-6.25 mx-1.25 md:mx-6.25">
        <Footer />
      </div>
    </div>
  );
}
