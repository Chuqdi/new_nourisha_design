"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import Button from "@/components/ui/Button";
import MessageBtn from "@/components/ui/MessageBtn";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();
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
      title: "Meal Subscriptions",
      description:
        "Enjoy a variety of meals delivered to you on a weekly  or monthly basis with our convenient subscription plans.",
      btnTitle: "Start Your Subscription",
      image: "subscriptions.png",
      onClick: () => router.push("/meal_plans"),
    },
    {
      title: "Single Meal Orders",
      description:
        "Craving something specific? Order single meals for instant delivery and satisfy your hunger right away.",
      btnTitle: "Order now",
      image: "meal_orders.png",
      onClick: () => router.push("/single_meals"),
    },
    {
      title: "Bulk Meal Orders",
      description:
        "Hosting an event or just stocking up? Order in bulk and get large quantities of your favorite dishes. ",
      btnTitle: "Order now",
      image: "bulk_meal.png",
      onClick: () => router.push("/bulk_meals"),
    },
  ];
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

      <div className="px-1.25 md:px-6.25 flex flex-col gap-4 bg-[#F9FAFB] py-6.25">
        <div className="flex justify-between items-center">
          <button className="text-[#FE7E00] font-inter text-base leading-[1.5rem] tracking-[-0.015rem] rounded-full p-6 h-14  w-fit border-[1px] border-[#828893] flex justify-center items-center">
            OUR FEATURES
          </button>
        </div>
        <h3 className="text-black-900 font-NewSpiritBold text-[1.4rem] md:text-[2rem]">
          Explore What Nourisha Offers
        </h3>
        <div className="flex flex-col md:flex-row items-center gap-8 mt-4">
          {exploreOptions.map((option, index) => (
            <div
              className="bg-[#E1F0D0] rounded-[2rem] "
              key={`explore_${index}`}
            >
              <div className="px-4 pt-4">
                <h3 className="font-inter text-black-900 text-[2rem]">
                  {option?.title}
                </h3>
                <p className="text-sm text-black-900 font-inter ">
                  {option?.description}
                </p>
                <div className="mt-3">
                  <Button
                    variant="primary"
                    isRightIconed
                    title={option?.title}
                    onClick={option?.onClick}
                  />
                </div>
              </div>

              <div className="flex items-end justify-end w-full border">
                <img
                  className="h-[8.75rem] object-contain"
                  src={`/images/about/explore_images/${option?.image}`}
                />
              </div>
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
