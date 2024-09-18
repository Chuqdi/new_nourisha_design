"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import Button from "@/components/ui/Button";
import MessageBtn from "@/components/ui/MessageBtn";
import { PRICINGS } from "@/config";
import { Icon } from "@iconify/react/dist/iconify.js";
//@ts-ignore
import HTMLRenderer from "react-html-renderer";

export default function Main() {
  return (
    <div className="w-full h-full relative pt-6">
      <Navbar />
      <div className="flex flex-col gap-6 mt-32">
        <MessageBtn title="PRICING" />
        <h3 className="text-center text-[2rem] md:text-[4.5rem] text-primary-Green-900 tracking-[-0.18rem] font-NewSpiritBold w-[65%] mx-auto">
          Great food, delivered to you on a budget.
        </h3>
        <p className="text-black-900 font-inter text-lg w-ful md:w-[65%] text-center mx-auto p-4">
          Whatever plan you choose, stay home, we will bring your food to you.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 p-4">
        {PRICINGS.map((pricing, index) => (
          <div
            className="p-3 rounded-[0.75rem] flex-1"
            style={{ background: pricing.gradientBg }}
            key={`pricing_${index}`}
          >
            <div className="bg-white p-3 rounded-[0.75rem]">
              <h3 className="text-black-900 font-inter text-[2.5rem] tracking-[-0.1rem] font-bold">
                £{pricing.price}
              </h3>
              <div className="flex items-center gap-2">
                <p
                  className="text-[2rem] font-NewSpiritBold"
                  style={{ color: pricing.textColor }}
                >
                  {pricing.duration}
                </p>
                <div className="bg-[#E6FEF2] rounded-[0.375rem] py-0 px-2 flex justify-center items-center h-8 text-primary-Green-900">
                  {pricing.days} days
                </div>
              </div>
              <div className="w-4/5 h-[5rem]">
                <HTMLRenderer html={pricing.description} />
              </div>

              <div className="mt-2 gap-3 flex flex-col my-6  max-h-[10rem]">
                {pricing.options.map((p, i) => (
                  <div
                    className="flex items-center gap-3"
                    key={`pricing_option_${i}`}
                  >
                    <div className="w-[1.13638rem] h-[1.13638rem] rounded-full border-[1px] border-[#04A76C] flex justify-center items-center">
                      <Icon color="#04A76C" icon="bi:check" />
                    </div>
                    <p>{p}</p>
                  </div>
                ))}
              </div>

              <Button className="h-[3rem]" variant="primary" fullWidth title="Subscribe" />
              <p className="text-black-900 text-sm text-center font-inter my-4">
                + £10 For deliveries during the week
              </p>
              <p className="text-black-900 text-sm text-center font-inter my-4">
                + £18 For weekend deliveries
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full mt-[3rem]">
        <img src="/images/zigzag.png" className="w-full" />
      </div>

      <div className="mt-6.25">
        <DownloadTheAppWidgetSection />
      </div>
      <div className="m-1.25 md:m-6.25 mb-0 mt-8">
        <Footer />
      </div>
    </div>
  );
}
