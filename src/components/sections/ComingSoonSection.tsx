import React from "react";

function ComingSoonSection() {
  return (
    <div className=" w-full md:w-2/5 flex flex-col gap-[0.4rem] items-center justify-center mx-auto">
      <img
        src="/images/icons/coming_soon.svg"
        alt="Coming Soon"
        className="w-[7.5rem] h-[7.5rem]"
      />
      <h3 className="text-[2rem] font-NewSpiritBold text-black-900 text-center">
        Coming Soon: New Regional Flavours
      </h3>
      <p className="text-xl text-center font-inter text-black-900">
        We currently don't have bulk meals from this region, but we're working hard
        to bring them to your plate. Stay tuned as we expand our offering to include
        even more authentic dishes from around the world!
      </p>
    </div>
  );
}

export default ComingSoonSection;
