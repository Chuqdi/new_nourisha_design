import Button from "@/components/ui/Button";
//@ts-ignore
import HTMLRenderer from "react-html-renderer";
import { PRICINGS } from "@/config";
import SidebarHOC from "@/HOC/SidebarHOC";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Subscription() {
  return (
    <SidebarHOC isBack title="Subscriptions">
      <div className="w-full grid grid-cols-1 gap-4">
        {PRICINGS.map((pricing, index) => (
          <div
            className="p-3 rounded-[0.75rem]"
            style={{ background: pricing.gradientBg }}
            key={`pricing_${index}`}
          >
            <div className="bg-white p-3 rounded-[0.75rem]">
              <h3 className="text-black-900 font-inter text-[2.5rem] tracking-[-0.1rem] font-bold">
                £{pricing.price}
              </h3>
              <div className="flex items-center gap-2">
                <p
                  className="text-[2rem] font-NewSpiritBold"
                  style={{ color: pricing.textColor }}
                >
                  {pricing.duration}
                </p>
                <div className="bg-[#E6FEF2] rounded-[0.375rem] py-0 px-2 flex justify-center items-center h-8 text-primary-Green-900">
                  {pricing.days} days
                </div>
              </div>
              <div className="w-4/5">
                <HTMLRenderer html={pricing.description} />
              </div>

              <div className="mt-2 gap-3 flex flex-col my-6">
                {pricing.options.map((p, i) => (
                  <div
                    className="flex items-center gap-3"
                    key={`pricing_option_${i}`}
                  >
                    <div className="w-[1.13638rem] h-[1.13638rem] rounded-full border-[1px] border-[#04A76C] flex justify-center items-center">
                      <Icon color="#04A76C" icon="bi:check" />
                    </div>
                    <p>{p}</p>
                  </div>
                ))}
              </div>

              <Button variant="primary" fullWidth title="Subscribe" />
              <p className="text-black-900 text-sm text-center font-inter my-4">
                + £10 For deliveries during the week
              </p>
              <p className="text-black-900 text-sm text-center font-inter my-4">
                + £18 For weekend deliveries
              </p>
            </div>
          </div>
        ))}
      </div>
    </SidebarHOC>
  );
}
