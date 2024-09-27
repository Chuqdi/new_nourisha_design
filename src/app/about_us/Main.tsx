"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import Button from "@/components/ui/Button";
import MessageBtn from "@/components/ui/MessageBtn";
import Ratings from "@/components/ui/Rating";
import { BREAKPOINT } from "@/config";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";

export default function Main() {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });

  const abouts = [
    {
      title: "Who we are",
      description:
        "At Nourisha, we are passionate about bringing the rich and diverse flavors of African cuisine right to your doorstep. Founded with a love for authentic dishes and a desire to share the culinary heritage of Nigeria, Ghana, Kenya, and Zimbabwe, we aim to make it easy for you to enjoy traditional meals without the hassle of cooking.",
    },
    {
      title: "Our mission",
      description:
        "At Nourisha, our mission is to bring the rich and diverse flavors of African cuisine to your table, making authentic and delicious meals accessible to everyone. We strive to celebrate and preserve our culinary heritage through high-quality, convenient meal solutions that connect people with the vibrant cultures of Nigeria, Ghana, Kenya, and Zimbabwe.",
    },
  ];

  const options = [
    {
      title: "Less Good Food Wasted",
      description:
        "We've all had to throw out food we didn't get around to using. When you order first, our chefs can order exactly the right amount of ingredients they need to craft your meals with zero waste.",
      bg: "#E6F6E3",
      // btnTitle: "Start Your Subscription",
      // onClick: () => router.push("/meal_plans"),
    },
    {
      title: "Less Disposable Packaging",
      description:
        "Most meal plan companies deliver a mountain of single-use packages and boxes with their food. We deliver your meals in 100% reusable bags and containers.",
      btnTitle: "Download the app",
      onClick: () => router.push("/meal_plans"),
      bg: "#FFF8E7",
    },
    {
      title: "Way Less Spent Per Week",
      description:
        "We don't need expensive store front locations to make your meals. We've cut costs without cutting quality, and we're passing it on to you.",
      bg: "#FFF8E7",

      // btnTitle: "Start Your Subscription",
      // onClick: () => router.push("/meal_plans"),
    },
    {
      title: "Less Transit-Less Pollution",
      description:
        "Meals don't have to sit and idle in traffic spewing CO2. Ordering exactly what's needed and sending in batches means less time in transit.",
      btnTitle: "Download the app",
      onClick: () => router.push("/meal_plans"),
      bg: "#E6F6E3",
    },
  ];
  const lastOptions = [
    {
      title: "Great Chefs-Better Ingredients",
      description:
        "We're focused on delivering high quality meals at the lowest possible cost. That's it.",
      bg: "#E6F6E3",
    },
    {
      title: "Delicious Delivered",
      description:
        "We deliver to all cities in England. If you have any questions about Nourisha, email us any time at help@eatnourisha.com",
      bg: "#FFF8E7",
    },
  ];
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

  const guidePrinciple = [
    {
      caption: "Authenticity",
      description:
        "We celebrate the rich flavors and traditions, bringing you meals made with genuine recipes and ingredients.",
      image: "authenticity.png",
    },
    {
      caption: "Sustainability",
      description:
        "Committed to eco-friendly practices, we source locally and use sustainable packaging to protect our planet.",
      image: "sustainability.png",
    },
    {
      caption: "Community",
      description:
        "Nourishing connections by supporting local farmers and empowering our communities with every meal.",
      image: "community.png",
    },
  ];
  return (
    <div className="w-full h-full relative pt-6">
      <Navbar />

      <div className="mx-1.25 md:mx-6.25 flex flex-col gap-8 mt-32">
        <MessageBtn title="ABOUT US" />
        <div className="w-full md:w-4/5 mx-auto">
          <h4 className="text-[#7DB83A] text-center font-NewSpiritBold text-[2rem] md:text-[4rem] ">
            We're happy to do the cooking
          </h4>
          <p className="text-black-900 text-center font-inter text-base">
            Look, we know you’re busy, and even with the best intentions, you
            don’t always eat right. That’s why we deliver freshly prepared food.
            And we only use the freshest, locally-sourced ingredients that help
            support local farmers and suppliers
          </p>
          <p className="text-black-900 text-center font-inter text-base mt-3">
            Nourisha is for everyone—busy families, seniors, young
            professionals, and college students—who want the convenience and
            health benefits of healthy, prepared meals coming right to their
            door.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
            <p className="font-[500] text-black-900 font-inter ">
              Rated Excellent On Trustpilot
            </p>
            <Ratings />
          </div>

          <div className="flex justify-center font-inter font-[500] items-center mt-3">
            <div className="flex items-center gap-1">
             
               Over 10,000 meals sold
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6.25  w-full py-[1.5rem] px-6.25 bg-background2 marquee-wrapper">
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
      </div>
      <div className="w-full my-6.25 mt-14">
        {isMobile ? (
          <img src="/images/our_mission_mobile.png" />
        ) : (
          <img src="/images/our_mission.png" />
        )}
        <p className="text-center font-bold text-[1.5rem] md:text-[2rem] font-NewSpiritBold mt-4">
          Your meals right on schedule. But there’s more:
        </p>
      </div>

      <div className="mx-2.5 md:mx-6.25 bg-[#FFF8E7] rounded-[2rem] flex flex-col md:flex-row  items-center justify-center p-4 md:p-10 gap-8">
        <div className="flex flex-col gap-3 p-0 md:p-8">
          <h3 className="font-NewSpiritBold text-base md:text-7xl text-black">
            We’re promise keepers.
          </h3>
          <p className="font-inter text-[1.25rem] text-[#030517]">
            Save time, eat better, be healthier. With Nourisha, it's never been
            easier to do all three.
          </p>
        </div>
        <div>
          <img
            src="/images/about_us_person.png"
            className="w-[33.625rem] h-auto"
          />
        </div>
      </div>

      <div className="mx-2.5 md:mx-6.25 my-4 flex flex-col gap-[1.5rem]">
        <div className="flex flex-col md:grid grid-cols-2  gap-[1.5rem]">
          {options
            // .filter((o, i) => i < 2)!
            .map((option, index) => {
              let btned = !!option.btnTitle;
              return (
                <div
                  key={`options_${index}`}
                  className={`rounded-[2rem] flex-1 p-4 flex flex-col justify-center ${
                    index === 2
                      ? "h-[25.25rem]"
                      : btned
                      ? " h-[28.25rem]"
                      : " h-[31.375rem] gap-8"
                  }`}
                  style={{
                    background: option?.bg,
                    marginTop:
                      index === 3
                        ? isMobile
                          ? undefined
                          : "-3rem"
                        : undefined,
                  }}
                >
                  <h4 className="text-[2rem] md:text-[3.5rem] font-NewSpiritBold">
                    {option?.title}
                  </h4>
                  <p className="text-[#030517] text-base font-inter">
                    {option.description}
                  </p>
             
                </div>
              );
            })}
        </div>

        <div className="flex flex-col md:grid grid-cols-2  gap-[1.5rem]">
          {lastOptions
            // .filter((o, i) => i < 2)!
            .map((option, index) => {
              return (
                <div
                  key={`options_${index}`}
                  className={`rounded-[2rem] flex-1 p-4 flex flex-col justify-center 
                       h-[28.25rem]
                  `}
                  style={{
                    background: option?.bg,
                    marginTop: index === 3 ? "-3rem" : undefined,
                  }}
                >
                  <h4 className="text-[2rem] md:text-[3.5rem] text-center font-NewSpiritBold">
                    {option?.title}
                  </h4>
                  <p className="text-[#030517] text-base font-inter">
                    {option.description}
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      <div
        style={{
          background: "url('/images/yellow_bg.png')",
          // height: "43.375rem",
          position: "relative",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
        }}
        className="py-[5rem] w-full px-2.5 md:px-[6.25rem] flex flex-col items-start gap-[6.5rem] justify-center my-6.25 "
      >
        <h3 className="text-center w-full  text-black-900 font-NewSpiritBold text-[2.75rem]">
          Our Guiding Priciples
        </h3>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {guidePrinciple.map((option, index) => (
            <div
              key={`guide_principle_${index}`}
              className="flex-1 bg-white p-8 rounded-[1rem] flex flex-col items-center justify-center gap-8"
            >
              <img src={`/images/${option.image}`} className="w-16 h-16" />
              <h3 className="text-black-900 text-[1.5rem] font-NewSpiritBold">
                {option.caption}
              </h3>
              <p className="font-inter text-center text-black-900">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-1.25">
        <DownloadTheAppWidgetSection />
      </div>
      <div className="mx-1.25 mt-6.25 md:mx-6.25">
        <Footer />
      </div>
    </div>
  );
}
