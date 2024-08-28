import Button from "@/components/ui/Button";
import SelectIndicator from "@/components/ui/SelectIndicator";
import { BREAKPOINT } from "@/config";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function SelectOrdertypeModalSection({
  close,
}: {
  close: () => void;
}) {
  const navigation = useRouter();
  const [onOneTime, setOnOneTime] = useState(false);
  const options = [
    {
      onClick: () => setOnOneTime(false),
      selected: !onOneTime,
      title: "Save big with a subscription.",
      options: [
        "Receive a weekly box of meals",
        "Customise your meal plan from our wide range of menu",
        "Meal delivered once a week",
        "2 meals per day",
      ],
    },
    {
      onClick: () => setOnOneTime(true),
      title: "One time",
      selected: onOneTime,
      options: [
        "Receive box of meals for a one time order",
        "Customise your meal plan from our wide range of menu",
        "Meal delivered once a week",
        "2 meals per day",
      ],
    },
  ];
  const ismobile = useMediaQuery({ maxWidth:BREAKPOINT });
  return (
    <div className="w-full bg-white rounded-[1rem] p-8 flex flex-col gap-8 mt-[30rem] md:mt-0 h-[40em]    overflow-y-scroll">

      <div className="flex justify-between items-center">
        <h4 className="text-[#323546] text-[2rem] md:text-[2.5rem] tracking-[-0.075rem] font-NewSpiritBold">
          Select an order type
        </h4>
        <button onClick={close} className="p-2  flex justify-center items-center bg-[#EDEDF3] rounded-full">
          <Icon color="#000" className="text-2xl" icon="iconoir:cancel" />
        </button>
      </div>

      <div className="text-black-900 font-inter text-lg">
        Get started with Nourisha meals! Now with many choices to pick from and
        meals starting from just £3.50
      </div>

      <div className="flex flex-col md:flex-row items-stretch gap-[0.81rem] ">
        {options.map((option, index) => (
          <div
            onClick={option.onClick}
            key={`option_${index}`}
            className={`
                flex-1
                rounded-[0.75rem] cursor-pointer
           flex flex-col gap-4 p-6
          ${option.selected ? "bg-[#E1F0D0]" : "bg-[#F2F4F7]"}
          `}
          >
            <div className="flex justify-end ">
              <SelectIndicator selected={option.selected} />
            </div>

            <h3 className="text-[#323546] text-[2rem] font-NewSpiritBold">
              {option.title}
            </h3>

            <div className="mt-4 flex flex-col gap-3">
              {option.options.map((o, i) => (
                <div
                  className="flex items-center gap-2"
                  key={`option_select_${i}`}
                >
                  <div className="w-4 h-4 justify-center items-center flex border-[1px] border-[#04A76C] rounded-full">
                    <Icon color="#04A76C" icon="bi:check" />
                  </div>
                  <p>{o}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center">
        <Button
        onClick={()=> navigation.push("/food_box")} fullWidth={ismobile} title="Continue" variant="primary" />
      </div>
    </div>
  );
}
