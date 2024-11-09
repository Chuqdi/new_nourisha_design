"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import Subscription from "@/components/sections/Modals/AccountModals/Subscriptions";
import Button from "@/components/ui/Button";
import MessageBtn from "@/components/ui/MessageBtn";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
//@ts-ignore
import HTMLRenderer from "react-html-renderer";

export default function Main() {
  const [onAfrican, setOnAfrican] = useState(true);
  const [_, setSideModal] = useAtom(ATOMS.showSideModal);

  const pricings = useMemo(
    () => [
      {
        gradientBg: "#F2F4F7",
        price: onAfrican ? "80" : "71",
        duration: "Weekly plan",
        textColor: "#323443",
        description: `<p class='font-inter text-base text-black-900'>2 chef-cooked meals daily  for <span class='font-bold'>5 days</span> </p>`,
        days: "5",
        options: [
          "Dinner and Lunch daily for 5 days",
          "Customise your meal plan from our wide range of menu",
          "Meal delivered once a week",
        ],
      },
      {
        gradientBg: "#F2F4F7",
        price: onAfrican ? "100" : "95.09",
        duration: "Weekly plan",
        textColor: "#323443",
        description: `<p class='font-inter text-base text-black-900'>
     2 chef-cooked meals daily <span class='font-bold'>7 days</span>
    </p>`,
        days: "7",

        options: [
          "Dinner and Lunch daily for 1 week(7 days)",
          "Customise your meal plan from our wide range of menu",
          "Meal delivered once a week",
        ],
      },
      {
        gradientBg: "#F2F4F7",
        price: onAfrican ? "400" : "383.06",
        duration: "Monthly plan",
        textColor: "#323443",
        description: `<p class='font-inter text-base text-black-900'>
       2 chef-cooked meals daily <span class='font-bold'>7 days</span>
      </p>`,
        days: "30",

        options: [
          "Dinner and Lunch daily for 1 week(7 days)",
          "Customise your meal plan from our wide range of menu",
          "Meal delivered once a week",
        ],
      },
    ],
    [onAfrican]
  );

  return (
    <>
      <title>
        Meal Prep, Meal Plans & Delivery At Affordable Prices in UK | Nourisha
      </title>
      <meta
        name="description"
        content="Get the best African, Asian and European meal plans at affordable prices in the UK from NOURISHA. Great food, delivered to you on a budget."
      />
      <div className="w-full h-full relative pt-6">
        <Navbar />
        <div className="flex flex-col gap-6 mt-32">
          <MessageBtn title="PRICING" />
          <h1 className="text-center text-[2rem] md:text-[4.5rem] text-primary-Green-900 tracking-[-0.18rem] font-NewSpiritBold w-[80%] mx-auto">
            Great food, delivered to you on a budget.
          </h1>
          <p className="text-black-900 font-inter text-lg w-ful md:w-[65%] text-center mx-auto p-4">
            Whatever plan you choose, stay home, we will bring your food to you.
          </p>
        </div>

        <div className="flex justify-center my-4">
          <div className="bg-[#F2F4F7] flex w-[90%] md:w-[21.4375rem] h-[2.5rem] rounded-[2rem] overflow-hidden font-inter text-base cursor-pointer">
            <p
              onClick={() => setOnAfrican(true)}
              className={`
            text-center flex-1 flex justify-center items-center
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
                text-center flex-1 flex justify-center items-center
                  ${
                    !onAfrican
                      ? "bg-[#E1F0D0] border-[#7DB83A] border-[0.5px] rounded-[2rem] text-[#008000] "
                      : ""
                  }
                  `}
            >
              Asian meal plans
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 p-4">
          {pricings.map((pricing, index) => (
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
                <div className="w-4/5 h-[2.5rem]">
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

                <Button
                  className="h-[3rem]"
                  variant="primary"
                  fullWidth
                  title="Subscribe"
                  onClick={() =>
                    setSideModal({ show: true, component: <Subscription /> })
                  }
                />

                <p className="text-black-900 text-sm text-center font-inter my-4">
                  + <span className="text-base">Free weekday delivery</span> and
                  £8 for weekend delivery
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
    </>
  );
}
