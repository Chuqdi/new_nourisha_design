import { Ratings } from "@/app/page";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINT } from "@/config";

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

export default function TestmoniesSection() {
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });
  return isMobile ? (
    <div className="flex flex-col gap-3 p-2 md:p-0">
      {[1, 2, 3].map(() => (
        <div className="w-full bg-[#F2F4F7] rounded-[0.375rem] p-2 gap-3 flex flex-col">
          <div className="flex items-center gap-3">
            <Ratings />
          </div>
          <p className="text-sm font-inter font-bold">
            They’re really nice above anything…
          </p>
          <p className="text-black-900 font-inter text-sm">
            They’re really nice above anything else. Every time I have had
            issues with my order they have resolved it speedily and
            considerately.
          </p>
          <div className="font-inter text-sm text-black-900 gap-2 flex ">
            <span className="font-bold">Earl Joey</span>
            25 Apr 2024
          </div>
        </div>
      ))}
    </div>
  ) : (
    <Carousel
     responsive={responsive} autoPlay swipeable>
      {[1, 2, 3].map(() => (
        <div className="w-[25rem] mx-4 bg-[#F2F4F7] rounded-[0.375rem] p-2 gap-3 flex flex-col">
          <div className="flex items-center gap-3">
            <Ratings />
          </div>
          <p className="text-sm font-inter font-bold">
            They’re really nice above anything…
          </p>
          <p className="text-black-900 font-inter text-sm">
            They’re really nice above anything else. Every time I have had
            issues with my order they have resolved it speedily and
            considerately.
          </p>
          <div className="font-inter text-sm text-black-900 gap-2 flex ">
            <span className="font-bold">Earl Joey</span>
            25 Apr 2024
          </div>
        </div>
      ))}

      {[1, 2, 3].map(() => (
        <div className="w-[25rem]  mx-4 bg-[#F2F4F7] rounded-[0.375rem] p-2 gap-3 flex flex-col">
          <div className="flex items-center gap-3">
            <Ratings />
          </div>
          <p className="text-sm font-inter font-bold">
            They’re really nice above anything…
          </p>
          <p className="text-black-900 font-inter text-sm">
            They’re really nice above anything else. Every time I have had
            issues with my order they have resolved it speedily and
            considerately.
          </p>
          <div className="font-inter text-sm text-black-900 gap-2 flex ">
            <span className="font-bold">Earl Joey</span>
            25 Apr 2024
          </div>
        </div>
      ))}
    </Carousel>
  );
}
