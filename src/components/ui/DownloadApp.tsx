"use client";

import Link from "next/link";

export default function DownloadApp() {
  const options = [
    {
      image: "play_store.png",
      path: "https://play.google.com/store/apps/details?id=com.eatnourisha.app&hl=en&gl=US",
    },
    {
      image: "app_store.png",
      path: "https://apps.apple.com/gb/app/nourisha-budget-meal-planner/id6451458690",
    },
  ];
  return (
    <div className="flex  flex-row items-center gap-5">
      {options.map((option, index) => (
        <Link target="__blank" key={`download_option_link_${index}`} href={option.path}>
          <img className="w-[8.5rem]" src={`/images/${option.image}`} />
        </Link>
      ))}
    </div>
  );
}
