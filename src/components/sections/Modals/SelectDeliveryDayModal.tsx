import Button from "@/components/ui/Button";
import { DAYS_OF_THE_WEEK } from "@/config";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSetAtom } from "jotai";
import { useState } from "react";
import { Checkbox } from "./DeliveryModal";

export default function SelectDeliveryDayModal() {
  const setSideModal = useSetAtom(ATOMS.showSideModal);
  const [activeDays, setActiveDays] = useState<string[]>([]);

  return (
    <div className="w-full bg-white h-[100vh] flex flex-col gap-6 py-8 px-3 max-h-[80vh] md:max-h-[100vh] overflow-y-scroll">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h4 className="text-black-900 text-2xl font-NewSpiritBold">
            Select delivery days
          </h4>
        </div>
        <button
          onClick={() => setSideModal({ show: false, component: undefined })}
          className="bg-[#EDEDF3] p-3 rounded-full"
        >
          <Icon color="#030517" className="w-6 h-6" icon="fluent-mdl2:cancel" />
        </button>
      </div>

      <p className="text-[#5C556C] font-inter text-base px-4">
        Choose the day of the week you want your meal delivered
      </p>

      <div className="px-4 flex flex-col gap-8">
        {DAYS_OF_THE_WEEK.map((day, index) => {
          const selected = activeDays.includes(day);
          return (
            <div
              onClick={() =>
                setActiveDays(
                  selected
                    ? activeDays.filter((d) => d !== day)
                    : [...activeDays, day]
                )
              }
              className="flex justify-between items-center rounded-[0.5rem] p-[0.75rem] w-full h-[3rem] border-[1px] border-[#BDC0CE] cursor-pointer"
              key={`payment_day_${index}`}
            >
              <p>{day}</p>
              <Checkbox
                checked={selected}
                onSelect={() =>
                  setActiveDays(
                    selected
                      ? activeDays.filter((d) => d !== day)
                      : [...activeDays, day]
                  )
                }
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center">
        <Button title="Save" variant="primary" />
      </div>
    </div>
  );
}
