import DownloadApp from "@/components/ui/DownloadApp";
import React from "react";

function DownloadAppModal() {
  return (
    <div className="flex flex-col md:flex-row h-[90vh] md:h-[70vh]   bg-white  rounded-[1rem] overflow-y-scroll md:overflow-hidden w-[85%] md:w-full relative mx-auto justify-center ">
      <div className="flex flex-col md:flex-row w-[90%] mx-auto  justify-center items-center gap-4">
        <div className="flex-1 ">
          <img
            src="/images/start_subscription.png"
            className="mt-5 md:mt-0 max-h-[30rem] md:h-fit w-[70%] md:w-[20.03931rem]  flex justify-center items-center mx-auto"
          />
        </div>

        <div className="flex flex-1 flex-col gap-1 justify-center items-center md:items-start">
          <h4 className="text-[#030517] font-NewSpiritBold text-[1.7rem] text-center md:text-left tracking-[-0.08rem]">
            Gift Cards on Nourisha 🎉
          </h4>
          <p className="font-inter text-base text-black-900 w-full md:w-[80%] text-center md:text-left">
            Send and receive gift cards instantly on Nourisha App! Download the
            app now to get started.
          </p>
          <DownloadApp />
        </div>
      </div>
    </div>
  );
}

export default DownloadAppModal;
