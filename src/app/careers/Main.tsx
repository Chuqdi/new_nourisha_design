"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import Button from "@/components/ui/Button";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Main() {
  return (
    <div className="w-full h-full relative pt-6">
      <Navbar />
      <div className="flex flex-col gap-6 mt-32 mx-1.25 md:mx-6.25 bg-[#F3F9EC] p-8 rounded-[1rem]">
        <button className="text-[#FE7E00] font-inter text-base leading-[1.5rem] tracking-[-0.015rem] rounded-full p-6 h-14 mx-auto w-fit border-[1px] border-[#828893] flex justify-center items-center">
          CAREERS
        </button>
        <h3 className="text-center font-NewSpiritBold text-primary-Green-900 text-[2rem] md:text-[4.5rem]">
          Join the Nourisha team
        </h3>

        <p className="text-black-900 font-inter text-lg text-center  mx-auto">
          Embark on a culinary journey with us! We are rapidly expanding our
          reach and people we serve.
        </p>
      </div>
      <div className="w-full mt-6.25">
        <img src="/images/zigzag.png" className="w-full" />
      </div>

      <div className="mx-1.25 md:mx-6.25">
        <h3 className="text-black-900 font-NewSpiritBold text-[2rem] mt-8">
          Openings
        </h3>
        <div className="flex flex-col gap-[2.75rem]">
          {[1, 2, 3, 5].map((opening, index) => (
            <div
              className="flex flex-col md:flex-row justify-between gap-[2.07rem] p-8 border-[2px] border-[#F2F4F7] rounded-[0.75rem]"
              key={`job_opening_${index}`}
            >
              <div className="w-full flex gap-4">
                <div className="bg-[#EDEDF3] rounded-[0.75rem] flex justify-center items-center p-[0.625rem] h-[3rem] w-[3rem]">
                  <Icon icon="flowbite:briefcase-outline" />
                </div>
                <div>
                  <h4 className="text-[1.5rem] text-black-900 tracking-[-0.0225rem] leading-[2.25rem] font-NewSpiritBold">
                    Nigerian chef
                  </h4>
                  <p className="text-base text-black-900 tracking-[-0.01875rem] leading-[1.875rem]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nunc euismod, ipsum non bibendum auctor, tortor lectus
                    convallis nulla, in consectetur libero purus id ligula.
                    Nullam fermentum justo id felis hendrerit
                  </p>
                </div>
              </div>

              <div className="w-full md:w-[9rem]">
                <Button fullWidth title="Apply now" variant="secondary" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 md:mt-16" />
      <DownloadTheAppWidgetSection />
      <div className="mt-6.25 mx-1.25 md:mx-6.25">
        <Footer />
      </div>
    </div>
  );
}
