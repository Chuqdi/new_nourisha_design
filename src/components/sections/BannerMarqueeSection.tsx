import React from "react";
import Marquee from "react-fast-marquee";


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
function BannerMarqueeSection() {
  return (
    <Marquee className="py-[1.5rem]   bg-background2" autoFill>
      {bannerOptions.map((option, index) => (
        <div
          key={`banner_option${index}`}
          className="flex items-center gap-1 whitespace-nowrap mx-3 "
        >
          <img
            src={`/images/banner/${option.image}`}
            className="h-[2.725rem] "
          />
          <p className="text-black-900 font-inter text-lg tracking-[-0.01688rem] leading-[1.6875rem]">
            {option.title}
          </p>
        </div>
      ))}
    </Marquee>
  );
}

export default BannerMarqueeSection;
