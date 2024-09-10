import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINT } from "@/config";
import Ratings from "../ui/Rating";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const firstTestmonies = [
  {
    name: "Earl Joey",
    description: `They${"’"}re really nice above anything else. Every time I have had issues with my order they have resolved it speedily and considerately.",
    date:"25 Apr 2024`,
    caption: `They${"’"}re really nice above anything…`,
  },
  {
    name: "Izek Precious",
    description: `Nourisha is 100 percent splendid….. quick delivery on your choose date and the meal is a top notch… can${"'"}t wait to order again…❤️`,
    date: "9 Apr 2024",
    caption: `Excellent`,
  },
  {
    name: "Iphie",
    description: `Swift deliver, well packaged meals and very loverly customer service. The food itself, was delicious. Will definitely order again`,
    caption: `Excellent`,
    date: "5 Jun 2024",
  },
  {
    name: "Freeborn Ehirhere",
    description: `Food was amazing, great customer service and support, fast delivery. I totally rey`,
    caption: `Food was amazing`,
    date: "5 June 2024",
  },
];

export default function TestmoniesSection() {
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });
  return isMobile ? (
    <div className="flex flex-col gap-3 p-2 md:p-0">
      {firstTestmonies.map((testmonies, index) => (
        <div
          key={`mobile_carousel_item_${index}`}
          className="w-full bg-[#F2F4F7] rounded-[0.375rem] p-2 gap-3 flex flex-col"
        >
          <div className="flex items-center gap-3">
            <Ratings />
          </div>
          <p className="text-sm font-inter font-bold">{testmonies?.caption}</p>
          <p className="text-black-900 font-inter text-sm">
            {testmonies?.description}
          </p>
          <div className="font-inter text-sm text-black-900 gap-2 flex ">
            <span className="font-bold">{testmonies?.name}</span>
            {testmonies?.date}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Carousel responsive={responsive} autoPlay swipeable>
      {firstTestmonies.map((testmonies, index) => (
        <div
          key={`carousel_item_${index}`}
          className="w-[25rem] mx-4 bg-[#F2F4F7] rounded-[0.375rem] p-2 gap-3 flex flex-col"
        >
          <div className="flex items-center gap-3">
            <Ratings />
          </div>
          <p className="text-sm font-inter font-bold">{testmonies?.caption}</p>
          <p className="text-black-900 font-inter text-sm">
            {testmonies?.description}
          </p>
          <div className="font-inter text-sm text-black-900 gap-2 flex ">
            <span className="font-bold">{testmonies?.name}</span>
            {testmonies?.date}
          </div>
        </div>
      ))}

      {firstTestmonies.map((testmonies, index) => (
        <div
          key={`item_${index}`}
          className="w-[25rem]  mx-4 bg-[#F2F4F7] rounded-[0.375rem] p-2 gap-3 flex flex-col"
        >
          <div className="flex items-center gap-3">
            <Ratings />
          </div>
          <p className="text-sm font-inter font-bold">{testmonies.caption}</p>
          <p className="text-black-900 font-inter text-sm">
            {testmonies.description}
          </p>
          <div className="font-inter text-sm text-black-900 gap-2 flex ">
            <span className="font-bold">{testmonies.name}</span>
            {testmonies.date}
          </div>
        </div>
      ))}
    </Carousel>
  );
}
