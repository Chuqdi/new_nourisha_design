"use client";

export default function Ratings() {
  return [1, 2, 3, 4].map((rate, index) => (
    <div
      className="bg-[#00B67A] h-8 w-8 flex justify-center items-center"
      key={`home_page_rating_${index}`}
    >
      <img alt="ratings" src="/images/rating_star.png" className="w-6 h-w-6" />
    </div>
  ));
}
