"use client";

import Link from "next/link";

export default function Ratings() {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((rate, index) => (
        <Link
          href="https://uk.trustpilot.com/review/eatnourisha.com"
          target="__blank"
        >
          <div
            className="bg-[#00B67A] h-8 w-8 flex justify-center items-center"
            key={`home_page_rating_${index}`}
          >
            <img
              alt="ratings"
              src="/images/rating_star.png"
              className="w-6 h-w-6"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
