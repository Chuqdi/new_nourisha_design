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
import BannerMarqueeSection from "@/components/sections/BannerMarqueeSection";
import CartModal from "@/components/sections/Modals/CartModal";
import { CART_MODAL_OPEN } from "@/config/storageKeys";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtomValue, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
//@ts-ignore
import HTMLRenderer from "react-html-renderer";
import { useMediaQuery } from "react-responsive";

export default function Main() {
  const intervalRef = useRef();
  const [loadingMenuImage, setLoadingMenuImage] = useState(true);

  const cartLoading = useAtomValue(ATOMS.cartIsLoading);
  const router = useRouter();

  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });
  const setSideModal = useSetAtom(ATOMS.showSideModal);

  const howItWorks = [
    {
      title: "Select the meals that is right for you",
      description:
        "With a large menu option to choose from, you'll be spoilt for choice!",
      icon: <Icon className="w-6 h-6" color="#fff" icon="ep:food" />,
    },
    {
      title: "Place your order and choose a delivery option",
      description: "We update our menu regularly with exciting new meals",
      icon: (
        <Icon className="w-6 h-6" color="#fff" icon="fluent:cart-24-regular" />
      ),
    },
    {
      title: "Get freshly prepared meals delivered",
      description:
        "Receive your fresh cooked meals, chilled & ready for the fridge.",
      icon: (
        <Icon className="w-6 h-6" color="#fff" icon="streamline:transfer-van" />
      ),
    },
  ];

  const whatOffered = [
    {
      text: "Meal Plans",
      description: `Enjoy a variety of meals delivered to you on a weekly  or monthly basis with our convenient subscription plans.
      <br />
        Our weekly meal plan food box is delivered once a week and the monthly plan delivered once a week for a month.
        `,
      onClick: () => router.push("/meal-plans"),
      btnText: "Select a plan",
      image: "subscription.png",
    },
    {
      text: "Single Meal Orders",
      description: `Craving something specific? Order single meals for instant delivery and satisfy your hunger right away.
        <br />
        Order single meals and get your delivery within 24-48 hours.
        `,
      onClick: () => router.push("/single-meals"),
      btnText: "Order now",
      image: "single.png",
    },
    {
      image: "bulk.png",
      text: "Bulk Meal Orders",
      description:
        "Hosting an event or just stocking up? Order in bulk and get large quantities of your favorite dishes. ",
      onClick: () => router.push("/bulk-meals"),
      btnText: "Order now",
    },
  ];

  const adsWidget = [
    {
      icon: "🎁",
      title:
        "<p class='text-[#030517] font-NewSpiritRegular'><b>Loyalty reward:</b> <i class='text-[#FE7E00]'>99%</i> discount on your 5th meal plan order within 30 days</p>",
    },
  ];
  useEffect(() => {
    //@ts-ignore
    intervalRef.current = setTimeout(() => {
      setLoadingMenuImage(false);
    }, 5000);
    () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const cartWasOpen = localStorage.getItem(CART_MODAL_OPEN);
    if (cartWasOpen && cartWasOpen === "1") {
      setSideModal({ show: true, component: <CartModal /> });
    }
  }, []);



  return (
    <>
      <title>
        Nourisha: UK’s No.1 African, Asian and European Meal Prep & Delivery
      </title>
      <meta
        name="description"
        content="Nourisha is the UK's No.1 African, Asian and European Meal Prep, Meal Plans & Delivery services. Our team of chefs, delivery drivers, and customer service experts provide top-notch meal
"
      />

      <div
        className={`
      w-full h-full relative pt-6
      
      `}
      >
        <div
          style={{
            background: "rgba(222, 245, 76, 0.30)",
            borderRadius: isMobile ? "52rem" : "90.0625rem",
            filter: "blur(78.7061996459961px)",
          }}
          className=" absolute right-0 top-0 h-[32.5rem] md:h-[60.0625rem] w-full md:w-[50rem] z-0 "
        />
        <Navbar />
        <div className="flex justify-center items-center bg-white w-full  my-32 mb-[5.06rem]">
          <div className="w-[90%]  md:w-[37.4375rem] mx-auto  items-center text-black flex justify-center ">
            {adsWidget.map((ads, index) => (
              <div
                className="flex items-center gap-1 text-[0.75rem] md:text-sm"
                key={`widget_${index}`}
              >
                <div>{ads.icon}</div>
                <HTMLRenderer html={ads.title} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row my-32 mt-2 mb-8 md:mb-32 items-center md:items-start">
          <div className="w-full   p-2  md:p-0 md:ml-[2rem] flex flex-col gap-5">
            <div>
              <h1 className="text-[#030517] font-NewSpiritBold text-[2.5rem] md:text-[3.5rem] md:tracking-[-0.135rem]">
                Savour the Flavours with Nourisha
              </h1>
              <p className="text-black-900 tracking-[-0.01688rem] leading-[1.6875rem] font-inter font-[500] text-lg mt-3 md:mt-0 w-full md:w-[93%]">
                Allow yourself to explore your culinary desires and fully
                immerse in the excitement of authentic African, Asian and
                European flavors.
              </p>
            </div>
            <div className="my-0 md:my-0">
              <Button
                fullWidth={isMobile}
                onClick={() => router.push("/meal-plans")}
                variant="primary"
                title="Get started"
                className="h-[2.75rem] rounded-[3rem]  py-8 md:py-6  font-bold font-inter "
              />
            </div>
            <div className="text-black-900 font-semibold font-inter text-sm md:text-lg flex gap-4 items-center">
              Rated excellent On Trustpilot
              <Ratings />
            </div>
            <div className="flex items-center gap-2">
              <p className="text-dark font-inter text-lg">
                4.7/5 star reviews on
              </p>
              <a
                href="https://uk.trustpilot.com/review/eatnourisha.com"
                target="__blank"
              >
                <img src="/images/trust_pilot.png" className="h-8" />
              </a>
            </div>
            <div className="flex md:block justify-center md:justify-end  mt-2">
              <DownloadApp />
            </div>
          </div>
          {isMobile ? (
            <img
              src="/images/taste.png"
              className={`w-full ${cartLoading ? "z-0" : " z-10"}`}
            />
          ) : (
            <img
              src="/images/taste.png"
              className={`w-[50%] h-auto ${cartLoading ? "z-0" : " z-10"}`}
            />
          )}
        </div>
        <BannerMarqueeSection />

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
                  <div className="bg-primary-orange-900 w-12 h-12 rounded-full flex justify-center items-center">
                    {works.icon}
                  </div>
                  <div className="absolute text-[0.75rem] text-black-900 text-center top-[-0.2rem] right-[-0.4rem] w-5 h-5 bg-white rounded-full flex justify-center items-center font-inter font-bold">
                    0{index + 1}
                  </div>
                </div>
                <h3 className="text-black-900 font-NewSpiritBold text-[1.5rem] text-center">
                  {works.title}
                </h3>
                <p className="text-center text-black-900">
                  {works.description}
                </p>
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
          className="py-[5rem] px-[1.25rem] md:px-6.25 flex-col flex gap-8  md:h-[58.375rem] items-center justify-center z-0"
        >
          <h4 className="text-black-900 font-NewSpiritBold text-[2.75rem] text-center">
            Explore What Nourisha Offers
          </h4>

          <div className="flex flex-col md:flex-row gap-8 justify-between">
            {whatOffered.map((offer, index) => (
              <div
                key={`what_we_offer_${index}`}
                className="py-8 px-3 flex flex-col gap-8 flex-1 bg-white rounded-[1rem] justify-between "
              >
                <div className="flex flex-col gap-8">
                  <img
                    src={`/images/whatOffer/${offer.image}`}
                    className="w-20 h-20"
                  />
                  <div className="flex flex-col gap-4 ">
                    <h4 className="text-2xl text-black-900 font-NewSpiritBold">
                      {offer.text}
                    </h4>
                    <p className="font-inter text-lg text-black-900  leading-[1.6875rem] tracking-[-0.01688rem]">
                      <HTMLRenderer html={offer.description} />
                    </p>
                  </div>
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
              At Nourisha, we bring you the authentic flavors from African, Asia
              and Europe with its unique culinary traditions. Our carefully
              curated menu currently features:
            </p>

            <MealSelectionSection isHome />
          </div>
        </div>

        <div className="md:mx-[0rem] my-[5rem] mb-20 md:-mb-8  flex flex-col gap-0 md:gap-8 px-2.5 md:px-0 mt-8 md:mt-0">
          <h4 className="text-center text-primary-orange-900 font-NewSpiritBold text-[1.25rem] md:text-[2.75rem] mx-auto md:w-[50rem]">
            So many meals delivered to thousands of satisfied customers
          </h4>
          <TestmoniesSection />
        </div>

        <CommonQuestionsSection />

        <div className=" mt-20 md:mt-0 mx-1.25 md:mx-6.25">
          <DownloadTheAppWidgetSection />
        </div>

        <div className="my-[5rem] mx-1.25 md:mx-[3.3rem]">
          <Footer />
        </div>
      </div>
    </>
  );
}
