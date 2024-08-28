import { COUNTRIES } from "@/config";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SingleCartItemSection({
  country,
  isHome,
}: {
  isHome?: boolean;
  country: (typeof COUNTRIES)[0];
}) {
  return (
    <div className="flex-1 bg-white p-2 border-[1px] border-[#F2F4F7] shadow-cartItem rounded-[0.75rem] relative">
      {isHome && (
        <div className="absolute right-[1.04169rem] w-9 h-9 flex justify-center items-center border overflow-hidden rounded-full top-4">
          <p className="text-[4rem]">{country.flag}</p>
        </div>
      )}
      <img src="/images/gray_bg.png" className="w-full h-[15.5625rem]" />
      {isHome && (
        <p className="text-black-900 font-inter text-xl tracking-[-0.01875rem] leading-[1.875rem] font-bold mt-4">
          £1.50
        </p>
      )}
      <p className="text-black-900 font-inter text-xl tracking-[-0.01875rem] leading-[1.875rem]">
        Jollof Rice, Peppered Beef, Fried Plantain Side
      </p>
      <div className="flex justify-between items-center mt-3">
        <button className="w-[6.56rem] h-[2.5rem] border-[1px] border-primary-orange-900 py-4 px-3 flex  items-center rounded-full justify-between">
          <p className="text-primary-orange-900 text-sm font-inter ">QTY: 2L</p>
          <Icon color="#030517" className="text-sm" icon="mingcute:down-fill" />
        </button>

        <div className="bg-[#F2F4F7] border-[1px] border-[#F2F4F7] rounded-[3rem] w-[7.68rem] h-[2.5rem] px-[0.25rem] justify-between  items-center flex ">
          <button className="bg-white justify-center items-center w-8 h-8 p-2 rounded-full flex text-3xl">
            -
          </button>
          <p className="text-black-900 font-inter text-base tracking-[-0.015rem] leading-[1.5rem]">
            1
          </p>
          <button className="bg-primary-orange-900 text-white justify-center items-center w-8 h-8 p-2 rounded-full flex text-3xl">
            +
          </button>
        </div>
      </div>
    </div>
  );
}
