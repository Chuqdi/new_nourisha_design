"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import RequestQuoteModal from "@/components/sections/Modals/RequestQuoteModal";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { BREAKPOINT } from "@/config";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function AboutPage() {
  const [showQuoteModal, setQuoteModal] = useState(false);
  const options = [
    {
      title: "Unmatched Culinary Expertise",
      description:
        "Our team of seasoned chefs is dedicated to creating dishes that not only look incredible but also taste exquisite. From classic favorites to innovative creations, we've got your culinary desires covered.",
      image: "01.svg",
    },
    {
      title: "Tailored Menus",
      description:
        "We know that no two parties are the same. That's why we offer completely customizable menus to suit your preferences and dietary requirements. Vegan, gluten-free, or something truly unique? We've got you covered.",
      image: "02.svg",
    },
    {
      title: "Exceptional Service",
      description:
        "Our commitment to your satisfaction goes beyond the food. We pride ourselves on delivering exceptional customer service, ensuring your party planning experience is stress-free and enjoyable.",
      image: "03.svg",
    },
    {
      title: "On-Time Delivery",
      description:
        "You can count on us to deliver your party meals punctually, so you can focus on entertaining your guests without a worry in the world.",
      image: "04.svg",
    },
  ];
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });
  return (
    <div className="w-full h-full relative pt-6">
      <Navbar />
      <Modal show={showQuoteModal}>
        <RequestQuoteModal close={() => setQuoteModal(false)} />
      </Modal>
      <div className="flex flex-col md:flex-row  gap-8 md:gap-[1.5px] items-center mx-1.25 md:mx-6.25 mt-32 ">
        <div className="flex flex-1 flex-col justify-start items-start gap-8">
          <button className="rounded-[4.5rem] p-[1.5rem] h-[3.5rem] justify-center items-center flex font-inter text-primary-orange-900 text-base leading-[1.5rem] tracking-[-0.015rem] w-fit border-[1px] border-[#828893]">
            OUR MEAL PLANS
          </button>
          <div>
            <h2 className="text-primary-Green-900 font-NewSpiritBold text-[2rem] md:text-[3.5rem]">
              Impress Guests with Party Meals
            </h2>
            <p className="text-black-900 font-inter text-base tracking-[-0.015rem] leading-[1.5rem]">
              Are you planning a memorable party or event? Let us take care of
              the culinary magic for you. We specialize in crafting delectable
              dishes that will leave your guests raving. Whether it{"'"}s an
              intimate gathering or a grand celebration, we have the perfect
              menu waiting for you.
            </p>
          </div>
          <div>
            <Button
              fullWidth={isMobile}
              onClick={() => setQuoteModal(true)}
              title="Request a Quote"
              variant="primary"
            />
          </div>
        </div>
        {isMobile ? (
          <img src="/images/about_side_image.png" />
        ) : (
          <div
            className="flex-1 rounded-[1.5rem]"
            style={{
              backgroundImage: `url('/images/about_side_image.png')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "32.6875rem",
            }}
          />
        )}
      </div>
      <div className="w-full">
        <img src="/images/zigzag.png" className="w-full" />
      </div>

      <div className="py-[3rem] bg-[#F2F4F7]">
        <h4 className="text-center font-NewSpiritBold text-[#323546] text-[2rem]">
          Why Choose Nourisha for Your Party Meals
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2  gap-8 mx-1.25 md:mx-6.25 my-8">
          {options.map((option, index) => (
            <div
              className="flex-1 bg-white p-6 rounded-[0.75rem] flex gap-4 flex-col"
              key={`about_option_${index}`}
            >
              {/* TODO: Change the numbering text font */}
              <img
                className="w-10 h-10 object-co"
                src={`/images/icons/${option.image}`}
              />
              <h2 className="text-2xl font-NewSpiritBold text-[#323546]">
                {option.title}
              </h2>
              <p className="text-black-900 font-inter text-lg tracking-[-0.01688rem] leading-[1.6875rem]">
                {option.description}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <Button
            onClick={() => setQuoteModal(true)}
            title="Request a Quote"
            variant="primary"
          />
        </div>
      </div>
      <DownloadTheAppWidgetSection />
      <div className="pt-[3rem] px-1.25 md:px-6.25">
        <Footer />
      </div>
    </div>
  );
}
