"use client";
import { BREAKPOINT } from "@/config";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useMediaQuery } from "react-responsive";
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
    name: "Temitope",
    description:
      "I use Nourisha to stock up on food when I’ll be unable to cook in a week. Their affordable meal plan option makes this a more practical choice than ordering in or eating out for 7 days. They have great portion sizes and the food is delicious.",
    caption: "Delicious Nigerian food at great prices",
    date: "02 July 2024",
  },
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
    name: "TatendaGwimbi",
    description: `Delicious food and prompt delivery service and great portions, will definitely order again.`,
    caption: `Delicious food and prompt delivery`,
    date: "23 July 2024",
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
    name: "Izek Precious",
    description: `Nourisha is 100 percent splendid….. quick delivery on your choose date and the meal is a top notch… can${"'"}t wait to order again…❤️`,
    date: "9 Apr 2024",
    caption: `Excellent`,
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
  {
    name: "Priscilla Darko",
    description: `They are good in cooking and also good at their time`,
    caption: `They are good in cooking and also good`,
    date: "07 August 2024",
  },
  {
    name: "Priscilla Darko",
    description: `They are good in cooking and also good at their time`,
    caption: `They are good in cooking and also good`,
    date: "07 August 2024",
  },
  {
    name: "Izek Precious",
    description: `Nourisha is 100 percent splendid….. quick delivery on your choose date and the meal is a top notch… can’t wait to order again…❤️`,
    caption: `Nourisha is 100 percent splendid`,
    date: "19 April 2024",
  },

  {
    name: "V. E.",
    description: `Great food,good portions,lovely taste and quick delivery.I highly recommend.Great customer service and very professional.`,
    caption: `Great food,good portions,lovely taste`,
    date: "18 May 2024",
  },
  {
    name: "Rosie Wilson",
    description: `Great food,good portions,lovely taste and quick delivery.I highly recommend.Great customer service and very professional.`,
    caption: `Great food,good portions,lovely taste`,
    date: "18 May 2024",
  },
  {
    name: "Joan Aigboje",
    description: `Food was amazing, great customer service and support, fast delivery. I totally rey`,
    caption: `Food was greate`,
    date: "05 June 2024",
  },
  {
    name: "Akinsola Olawoagbo",
    description: `Delivery was pretty early and all items were in very good condition, well packaged. The best asun I’ve had so far, banga & starch was great too. I just can’t describe everything.`,
    caption: `Food`,
    date: "12 July 2024",
  },
  {
    name: "Christiana",
    description: `Just received my order for the week from nourisha and I'm excited to try out the meals soon because they look delicious! 🤤 The packaging is great and portion is very okay. It's my first time ordering and I believe I'll be patronising frequently as it'll save me a lot of stress from cooking all the time! 😁
I'll be coming back to leave another review once I have tried out the wonderful delicacies 😊`,
    caption: `Food was nice`,
    date: "12 Jul 2024",
  },
  {
    name: "Priscilla Darko",
    description: `They are good in cooking and also good at their time`,
    caption: `They are good in cooking and also good`,
    date: " 07 August 2024",
  },
  {
    name: "Izek Precious",
    description: `They are good in cooking and also good at their time`,
    caption: `Nourisha is 100 percent splendid….. quick delivery on your choose date and the meal is a top notch… can’t wait to order again…❤️`,
    date: "19 April 2024",
  },
  {
    name: "Izek Precious",
    description: `TDelicious food and prompt delivery`,
    caption: `Delicious food and prompt delivery service and great portions, will definitely order again.`,
    date: "23 July 2024",
  },
  {
    name: "V.E",
    description: `Great food,good portions,lovely taste`,
    caption: `Great food,good portions,lovely taste and quick delivery.I highly recommend.Great customer service and very professional.`,
    date: "18 May 2024",
  },
  {
    name: "Iphie",
    description: `Great food,good portions,lovely taste`,
    caption: `Swift deliver, well packaged meals and very loverly customer service. The food itself, was delicious. Will definitely order again`,
    date: "04 June 2024",
  },
  {
    name: "Good authentic flavours",
    description: `Great food,good portions,lovely taste`,
    caption: `Good authentic flavours/dishes, quick delivery and great customer service. For easy and tasty African meals, definitely recommend!`,
    date: "04 June 2024",
  },
  {
    name: "Joan Aigboje",
    description: `Food was amazing`,
    caption: `Food was amazing, great customer service and support, fast delivery. I totally rey`,
    date: "04 June 2024",
  },
  {
    name: "Samson Mgbaja",
    description: `Good and Quality meals`,
    caption: `Good and Quality meals, I highly recommend them. Top notch packaging and delivery`,
    date: " 04 May 2024",
  },
  {
    name: "Mic",
    description: `I highly recommend`,
    caption: `I highly recommend, a good and trustworthy company!`,
    date: "02 May 2024",
  },
  {
    name: "Mia",
    description: `Great customer service`,
    caption: `Great customer service, quick delivery and delicious food. Absolutely fantastic!`,
    date: " 05 June 2024",
  },
  {
    name: "Emmanuel Adedeji Adeyemi",
    description: `Great customer service`,
    caption: `It was a wonderful experience.`,
    date: "22 July 2024",
  },
  {
    name: "Benjamin Okoli",
    description: `Quick delivery, great customer service, delicious food`,
    caption: `No complaints`,
    date: "12 June 2024",
  },
  {
    name: "Hammed Adegbenro",
    description: `Good Good Good.`,
    caption: `Good Good Good.`,
    date: "12 June 2024",
  },
  {
    name: "Hammed Adegbenro",
    description: `Good Good Good.`,
    caption: `Good Good Good.`,
    date: "12 June 2024",
  },
 
];


export default function TestmoniesSection() {
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });
  return (
    <div className="  w-full py-[1.5rem] px-6.25 bg-white marquee-wrapper gap-3">
      <div
        style={{
          animation: "250s slide infinite linear",
        }}
        className="marquee-slide flex items-center gap-0"
      >
        {firstTestmonies.concat(secondTestmonies).filter(t => t.description.length < 40).map((testmonies, index) => (
          <div
            key={`carousel_item_${index}`}
            className="w-[25rem] text-wrap h-[11rem] mx-1 bg-[#F2F4F7] rounded-[0.375rem] py-1 px-2 pr-4 gap-3 flex flex-col justify-center overflow-x-hidden"
          >
            <div className="flex items-center gap-3">
              <Ratings />
            </div>
            <p className="text-sm font-inter font-bold text-wrap">
              {testmonies?.caption}
            </p>
            <p className="text-black-900 font-inter text-sm w-4/5 text-wrap">
              {testmonies?.description}
            </p>
            <div className="font-inter text-sm text-black-900 gap-2 flex ">
              <span className="font-bold">{testmonies?.name}</span>
              {testmonies?.date}
            </div>
          </div>
        ))}
      </div>
     
    </div>
  );
}
