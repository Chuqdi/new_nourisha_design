"use client";

import Image from "next/image";

export default function Ratings() {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((rate, index) => (
        <a
          key={`home_page_rating_${index}`}
          href="https://uk.trustpilot.com/review/eatnourisha.com"
          target="__blank"
        >
          <div
            className="bg-[#00B67A] h-8 w-8 flex justify-center items-center"
            key={`home_page_rating_${index}`}
          >
            <Image
              width={24}
              height={24}
              alt="ratings"
              src="/images/rating_star.png"
            />
          </div>
        </a>
      ))}
      {/* <img src="/images/rating.png" className="w-[10.71431rem] h-8" /> */}
    </div>
  );
}
