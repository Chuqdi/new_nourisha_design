"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import MessageBtn from "@/components/ui/MessageBtn";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function AboutPage() {
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

  const exploreOptions = [
    {
        title:"Meal Subscriptions",
        description:"Enjoy a variety of meals delivered to you on a weekly  or monthly basis with our convenient subscription plans.",
        btnTitle:"Start Your Subscription",
        image:""
    }
  ]
  return (
    <div className="w-full h-full relative pt-6">
      <Navbar />

      <div className="mx-1.25 md:mx-6.25 flex flex-col gap-8 mt-32">
        <MessageBtn title="ABOUT US" />
        <div>
          <h4 className="text-[#7DB83A] text-center font-NewSpiritBold text-[2rem] md:text-[4rem] ">
            Welcome to Nourisha
          </h4>
          <p className="text-black-900 text-center font-inter text-base">
            We commit to quality, authenticity, and convenience. Our meals use
            fresh ingredients and traditional recipes, offering a true taste of
            Africa. We support sustainability and local communities through
            responsible sourcing.
          </p>
        </div>
      </div>
      <div className="mx-1.25 my-8">
        <img src="/images/about_us_image.png" />
      </div>
      <img src="/images/zigzag.png" className="w-full" />

      <div className="flex flex-col md:flex-row gap-4 mx-1.25 md:mx-6.25 my-[2rem]">
        {abouts.map((about, index) => (
          <div className="flex-1 gap-4 flex flex-col" key={`about_${index}`}>
            <h4 className="text-[#7DB83A] text-[1.5rem] md:text-[2rem] font-NewSpiritBold">
              {about.title}
            </h4>
            <p className="text-black-900 text-base tracking-[-0.015rem] leading-[1.5rem] ">
              {about.description}
            </p>
          </div>
        ))}
      </div>

      <div className="px-1.25 md:px-6.25 flex flex-col gap-3 bg-[#F9FAFB] py-6.25">
        <div className="flex justify-between items-center">
          <button className="text-[#FE7E00] font-inter text-base leading-[1.5rem] tracking-[-0.015rem] rounded-full p-6 h-14  w-fit border-[1px] border-[#828893] flex justify-center items-center">
            OUR FEATURES
          </button>

          {/* <div className="flex items-center gap-6">
            <button className="w-14 h-14 flex justify-center items-center border-[1px] rounded-[3rem] border-primary-orange-900">
              <Icon
                color="#FE7E00"
                className="text-xlg"
                icon="ph:arrow-left-bold"
              />
            </button>
            <button className="w-14 h-14 flex justify-center items-center border-[1px] rounded-[3rem] border-primary-orange-900">
              <Icon color="#FE7E00" className="text-xlg" icon="ep:right" />
            </button>
          </div> */}
        </div>
        <h3 className="text-black-900 font-NewSpiritBold text-[1.4rem] md:text-[2rem]">
          Explore What Nourisha Offers
        </h3>
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
