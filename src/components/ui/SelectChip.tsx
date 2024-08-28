import { Icon } from "@iconify/react/dist/iconify.js";

export default function SelectChip({
  title,
  selected,
  onClick,
}: {
  selected: boolean;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center h-[3rem] rounded-[2rem] py-[0.4375rem] px-[0.75rem] text-black-900 text-lg font-inter tracking-[-0.01688rem] leading-[1.687rem] gap-2 w-fit ${
        selected ? "bg-[#E1F0D0]" : "bg-[#F2F4F7]"
      }`}
    >
      {title}
      {selected ? (
        <Icon
          color="#7DB83A"
          className="w-4 h-4"
          icon="streamline:check-solid"
        />
      ) : (
        <Icon color="#030517" className="w-4 h-4" icon="mingcute:add-fill" />
      )}
    </button>
  );
}
