export default function SelectIndicator ({ selected }: { selected: boolean }) {
    return (
      <button
        className={`
            flex items-center rounded-[0.37rem] h-[1.5rem] p-2 gap-2
            ${selected ? "bg-[#1AA34A]" : "bg-white"}
  
            `}
      >
        <p
          className={` font-inter text-[0.75rem] leading-[1.125rem] tracking-[-0.00875rem] ${
            selected ? "text-white" : "text-black-900"
          }`}
        >
          Select
        </p>
        <div
          className={`w-[1.125rem] h-[1.125rem] rounded-full border-[1px] 
      ${!selected ? "border-[#323546]" : "border-white"}
        
        `}
        />
      </button>
    );
  };