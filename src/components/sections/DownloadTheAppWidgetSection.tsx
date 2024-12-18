"use client";

import Link from "next/link";

export default function DownloadTheAppWidgetSection() {
  return (
    <div className="gap-2  md:gap-[3rem] flex-col-reverse md:flex-row flex  w-full  items-center justify-center  ">
      <div className="flex-1 ">
        <img
          src="/images/start_subscription.png"
          className="mt-5 md:mt-0 max-h-[30rem] md:h-fit w-[80%] md:w-[20.03931rem]  flex justify-center items-center mx-auto "
        />
      </div>
      <div className=" flex flex-col gap-4 flex-1">
        <h4 className="font-NewSpiritBold text-[2rem] text-center md:text-left md:text-[3.5rem] text-primary-Green-900  tracking-[-0.14rem]">
          Download the App
        </h4>
        <p
          className="text-black-900 font-inter text-lg
          leading-[1.6875rem] text-center md:text-left tracking-[-0.01688rem] w-full md:w-4/5 "
        >
          Join other people who enjoy and savour authentic African, Asian and
          European Cuisines with Nourisha.
        </p>
        <div className="flex justify-center md:justify-start items-center gap-[1.35rem]">
          <div className="flex justify-center items-center w-10 h-10 border-[1.25px] border-[#323546] rounded-full">
            <Link href="https://apps.apple.com/gb/app/nourisha-budget-meal-planner/id6451458690">
              <img src="/images/navbar/apple.svg" className="w-6 h-6" />
            </Link>
          </div>

          <div className="flex justify-center items-center w-10 h-10 border-[1.25px] border-[#323546] rounded-full">
            <Link href="https://play.google.com/store/apps/details?id=com.eatnourisha.app&hl=en&gl=US">
              <img src="/images/navbar/play_store.svg" className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
