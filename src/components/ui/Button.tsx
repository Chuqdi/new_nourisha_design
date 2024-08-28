"use client";
import { Icon } from "@iconify/react/dist/iconify.js";

type props = {
    title:string;
  variant: "primary" | "secondary";
  iconName?:string;
  isRightIconed?:boolean;
  fullWidth?:boolean;
  className?:string;
} & React.ComponentProps<"button">;
export default function Button({title,className,isRightIconed, variant,iconName,fullWidth, ...rest }: props) {
  return (
    <button
      className={`
        h-8 py-4 px-[1.25rem] text-sm font-inter  rounded-full flex items-center justify-center shadow-btn gap-2
        ${variant === "primary" ? "bg-primary-orange-900 border-none text-white" : "bg-white border-[1px] border-primary-orange-900 text-primary-orange-900"}
        ${fullWidth && "w-full"}
        ${className}
        `}
      {...rest}
    >
      {title}
      {
        isRightIconed &&
        <img
        src="/images/icons/right.svg"
        />
      }
      {
        iconName && (
          <Icon className="ml-[1.25rem]" icon={iconName} color="#fff" />
        )
      }
    </button>
  );
}
