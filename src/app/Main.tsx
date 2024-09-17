"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import CommonQuestionsSection from "@/components/sections/CommonQuestionSection";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import MealSelectionSection from "@/components/sections/MealSelectionSection";
import TestmoniesSection from "@/components/sections/TestmoniesSection";
import Button from "@/components/ui/Button";
import DownloadApp from "@/components/ui/DownloadApp";
import Ratings from "@/components/ui/Rating";
import { BREAKPOINT } from "@/config";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const ArrowedContainer = ({
  containerClass,
  arrowClass,
  title,
  description,
}: {
  containerClass: string;
  title: string;
  description: string;
  arrowClass: string;
}) => {
  return (
    <div className={`absolute w-[35.5rem] ${containerClass}`}>
      <h4 className="text-white font-NewSpiritBold text-[2rem] ">{title}</h4>
      <p className="text-white font-inter text-lg leading-[1.6875rem] tracking-[-0.01688rem] w-4/5">
        {description}
      </p>
      <img
        src="/images/arrow.png"
        className={`absolute h-[6.4375rem] ${arrowClass}`}
      />
    </div>
  );
};

export default function Main() {
  const intervalRef = useRef();
  const [loadingMenuImage, setLoadingMenuImage] = useState(true);
  const bannerOptions = [
    {
      image: "chef.svg",
      title: "Chef crafted meals",
    },
    {
      image: "portion.svg",
      title: "Portion control",
    },
    {
      image: "halal.svg",
      title: "100% Halal",
    },
    {
      image: "packed_flavor.svg",
      title: "Packed with flavor",
    },
    {
      image: "frozen.svg",
      title: "Frozen to perfection",
    },
    {
      image: "ready.svg",
      title: "Ready In minutes",
    },
  ];
  const router = useRouter();

  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });

  const howItWorks = [
    {
      title: "Select the meals that is right for you",
      description:
        "With a large menu option to choose from, you'll be spoilt for choice!",
    },
    {
      title: "Place your order and choose a delivery option",
      description: "We update our menu regularly with exciting new meals",
    },
    {
      title: "Get freshly prepared meals delivered",
      description:
        "Receive your fresh cooked meals, chilled & ready for the fridge.",
    },
  ];

  const whatOffered = [
    {
      text: "Meal Subscriptions",
      description:
        "Enjoy a variety of meals delivered to you on a weekly  or monthly basis with our convenient subscription plans.",
      onClick: () => router.push("/meal_plans"),
      btnText: "Start Your Subscription",
      image: "subscription.png",
    },
    {
      text: "Single Meal Orders",
      description:
        "Craving something specific? Order single meals for instant delivery and satisfy your hunger right away.",
      onClick: () => router.push("/single_meals"),
      btnText: "Order now",
      image: "single.png",
    },
    {
      image: "bulk.png",
      text: "Bulk Meal Orders",
      description:
        "Hosting an event or just stocking up? Order in bulk and get large quantities of your favorite dishes. ",
      onClick: () => router.push("/bulk_meals"),
      btnText: "Order now",
    },
  ];
  useEffect(() => {
    //@ts-ignore
    intervalRef.current = setTimeout(() => {
      setLoadingMenuImage(false);
    }, 5000);
    () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      className={`
      w-full h-full relative pt-6
      
      `}
    >
      <img
        src="/images/index_screen_gray_bg.png"
        className=" absolute right-0 top-0 h-[40rem] md:h-[60.0625rem] w-full md:w-[50rem] z-0"
      />
      <Navbar />
      <div className="flex flex-col-reverse md:flex-row my-32 mb-8 md:mb-32">
        <div className="flex-1 p-2 md:p-0 md:ml-6.25 flex flex-col gap-5">
          <div>
            <h2 className="text-[#030517] font-NewSpiritBold text-[2.5rem] md:text-[4.5rem] md:leading-[5.85rem] md:tracking-[-0.135rem]">
              Savor the Flavors with Nourisha
            </h2>
            <p className="text-black-900 tracking-[-0.01688rem] leading-[1.6875rem] font-inter text-lg">
              Allow yourself to explore your culinary desires and fully immerse
              in the excitement of authentic flavors.
            </p>
          </div>
          <div>
            <Button
              fullWidth={isMobile}
              variant="primary"
              title="Get started"
            />
          </div>
          <div className="text-black-900 font-inter text-lg flex gap-4">
            Rated Excellent On Trustpilot
            <Ratings />
          </div>
          <div className="flex items-center gap-3">
            <p className="text-dark font-inter text-lg">4,021 reviews on</p>
            <img src="/images/trust_pilot.png" className="h-8" />
          </div>
          <div className="mt-2">
            <DownloadApp />
          </div>
        </div>
        {isMobile ? (
          <img src="/images/taste.png" className="w-full z-[999]" />
        ) : (
          <div
            style={{
              backgroundRepeat: "no-repeat",
              background: "url(/images/taste.png)",
              backgroundSize: "cover",
            }}
            className="flex-1 h-[23.125rem] relative z-50 "
          />
        )}
      </div>

      <div className="  w-full py-[1.5rem] px-6.25 bg-background2 marquee-wrapper">
        <div className="marquee-slide flex items-center gap-20 ">
          {bannerOptions.map((option, index) => (
            <div
              key={`banner_option${index}`}
              className="flex items-center gap-2 whitespace-nowrap "
            >
              <img
                src={`/images/banner/${option.image}`}
                className="h-[2.725rem]"
              />
              <p className="text-black-900 font-inter text-lg tracking-[-0.01688rem] leading-[1.6875rem]">
                {option.title}
              </p>
            </div>
          ))}
        </div>

        <div className="marquee-slide flex items-center gap-20 ">
          {bannerOptions.map((option, index) => (
            <div
              key={`banner_image_${index}`}
              className="flex items-center gap-2 whitespace-nowrap "
            >
              <img
                src={`/images/banner/${option.image}`}
                className="h-[2.725rem]"
              />
              <p className="text-black-900 font-inter text-lg tracking-[-0.01688rem] leading-[1.6875rem]">
                {option.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {loadingMenuImage && (
        <div className="w-full flex justify-center items-center">
          <Icon
            icon="line-md:loading-loop"
            className="w-20 h-20"
            color="#FE7E00"
          />
        </div>
      )}
      <div className="mt-20" />
      {isMobile ? (
        <img src="/images/absolute_menu.png" />
      ) : (
        <img src="/images/absolute_menu_desktop.png" />
      )}

      <div className="my-[5rem] mx-0 md:mx-6.25">
        <h3 className="font-NewSpiritBold text-4xl text-center">
          How it works
        </h3>
        <div className="flex flex-col md:flex-row items-center">
          {howItWorks.map((works, index) => (
            <div
              className="flex-1 flex flex-col gap-4 justify-center items-center p-2 md:p-10"
              key={`how_it_works_${index}`}
            >
              <div className="relative">
                <img src="/images/primary_cart.png" className="w-12 h-1w-12" />
                <div className="absolute text-[0.75rem] text-black-900 text-center top-[-0.2rem] right-[-0.4rem] w-5 h-5 bg-white rounded-full flex justify-center items-center font-inter font-bold">
                  0{index + 1}
                </div>
              </div>
              <h3 className="text-black-900 font-NewSpiritBold text-[1.5rem] text-center">
                {works.title}
              </h3>
              <p className="text-center text-black-900">{works.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          backgroundImage: isMobile
            ? "url(/images/curve_bg_yellow_mobile.png)"
            : "url(/images/curve_bg_yellow.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="py-[5rem] px-[1.25rem] md:px-6.25 flex-col flex gap-8  md:h-[46.375rem] items-center justify-center"
      >
        <h4 className="text-black-900 font-NewSpiritBold text-[2.75rem] text-center">
          Explore What Nourisha Offers
        </h4>

        <div className="flex flex-col md:flex-row gap-8">
          {whatOffered.map((offer, index) => (
            <div
              key={`what_we_offer_${index}`}
              className="py-8 px-3 flex flex-col gap-8 flex-1 bg-white rounded-[1rem]"
            >
              <img
                src={`/images/whatOffer/${offer.image}`}
                className="w-20 h-20"
              />
              <div>
                <h4 className="text-2xl text-black-900 font-NewSpiritBold">
                  {offer.text}
                </h4>
                <p className="font-inter text-lg text-black-900  leading-[1.6875rem] tracking-[-0.01688rem]">
                  {offer.description}
                </p>
              </div>

              <div>
                <Button
                  title={offer.btnText}
                  onClick={offer.onClick}
                  variant="primary"
                  isRightIconed
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="py-1.25 md:py-[5rem] px-1.25 md:px-6.25 flex-col flex gap-8">
        <div className="flex flex-col gap-6">
          <h3 className="font-NewSpiritBold text-[2rem] md:text-[2.75rem] text-black-900">
            Discover Our Diverse Culinary Offerings
          </h3>
          <p className="text-black-900 font-inter text-lg leading-[1.6875rem] tracking-[-0.01688rem] w-[85%]">
            At Nourisha, we bring you the authentic flavors from various African
            countries, each with its unique culinary traditions. Our carefully
            curated menu currently features:
          </p>

          <MealSelectionSection isSingle isHome />
        </div>
      </div>

      <div className="md:mx-[0rem] my-[5rem] mt-0 flex flex-col gap-8">
        <h4 className="text-center text-primary-orange-900 font-NewSpiritBold text-[1.25rem] md:text-[2.75rem] mx-auto md:w-[50rem]">
          So many meals delivered to thousands of satisfied customers
        </h4>
        <TestmoniesSection />
        <p className="text-center text-lg p-2 md:p-0 font-inter -mt-4">
          Rated <span className="font-bold">4.5</span> / 5 based on 1,243
          reviews. Showing our 5 star reviews.
        </p>
      </div>

      <CommonQuestionsSection />

      <div className="mx-1.25 md:mx-6.25">
        <DownloadTheAppWidgetSection />
      </div>

      <div className="my-[5rem] mx-1.25 md:mx-[3.3rem]">
        <Footer />
      </div>
    </div>
  );
}