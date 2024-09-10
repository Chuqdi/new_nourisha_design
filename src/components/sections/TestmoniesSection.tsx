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
    name: "Tiana",
    description: `Just received my order for the week from nourisha and I'm excited to try out the meals soon because they look delicious! 🤤 The packaging is great and portion is very okay. It's my first time ordering and I believe I'll be patronising frequently as it'll save me a lot of stress from cooking all the time! 😁
  😊`,
    caption: `Food was amazing`,
    date: "12 July 2024",
  },
];

const secondTestmonies = [
  {
    name: "Michelle",
    description: `Great customer service. Very polite and understanding after I made a complaint which was actually my fault as i didn't tell them before the meals were delivered. Will definitely place more orders in the future.`,
    caption: `Great customer service`,
    date: "20 June 2024",
  },
  {
    name: "Richmond",
    description: `Their food was well packaged, affordable and super delicious! As a Ghanaian, it wasn't easy coming by Ghanaian meals where I lived but thanks to Nourisha, I can eat my favourite Ghanaian delicacies everyday at unbeatable prices.`,
    date: "8 Jul 2024",
    caption: `Tasty Ghanaian dishes`,
  },
  {
    name: "Akinsola Olawoagbo",
    description: `Delivery was pretty early and all items were in very good condition, well packaged. The best asun I’ve had so far, banga & starch was great too. I just can’t describe everything.`,
    caption: `Food`,
    date: "12 July 2024",
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
      {firstTestmonies.concat(secondTestmonies).map((testmonies, index) => (
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
    <Carousel
    itemClass="!px-0"
    responsive={responsive} autoPlay swipeable>
      {firstTestmonies.map((testmonies, index) => (
        <div
          key={`carousel_item_${index}`}
          className="w-[25rem] h-full mx-4 bg-[#F2F4F7] rounded-[0.375rem] p-2 gap-3 flex flex-col"
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

      {secondTestmonies.map((testmonies, index) => (
        <div
          key={`item_${index}`}
          className="w-[25rem] h-full  mx-4 bg-[#F2F4F7] rounded-[0.375rem] p-2 gap-3 flex flex-col"
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
