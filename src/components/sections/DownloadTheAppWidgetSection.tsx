export default function DownloadTheAppWidgetSection() {
  return (
    <div className="gap-12 md:gap-0 flex-col-reverse md:flex-row flex  w-full   md:w-[29]  items-center justify-center  mx-auto  ">
      <img
        src="/images/start_subscription.png"
        className=" h-fit w-[80%] md:w-[20.03931rem]  flex justify-center items-center mx-auto shadow-btn"
      />
      <div className=" flex flex-col gap-4">
        <h4 className="font-NewSpiritBold text-[2rem] text-center md:text-left md:text-[3.5rem] text-primary-Green-900  tracking-[-0.14rem]">
          Download the app
        </h4>
        <p
          className="text-black-900 font-inter text-lg
          leading-[1.6875rem] text-center md:text-left tracking-[-0.01688rem] w-full md:w-4/5 "
        >
          Join other people who enjoy and savor authentic African cuisine with
          Nourisha
        </p>
        <div className="flex justify-center md:justify-start items-center gap-[1.35rem]">
          <div className="flex justify-center items-center w-10 h-10 border-[1.25px] border-[#323546] rounded-full">
            <img src="/images/navbar/apple.svg" className="w-6 h-6" />
          </div>

          <div className="flex justify-center items-center w-10 h-10 border-[1.25px] border-[#323546] rounded-full">
            <img src="/images/navbar/play_store.svg" className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
