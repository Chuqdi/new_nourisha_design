import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

type props = {
  className?: string;
  isPassword?: boolean;
} & React.ComponentProps<"input">;
export default function Input({ isPassword, className, ...rest }: props) {
  const [inputType, setInputType] = useState(
    isPassword ? "password" : rest?.type
  );
  return (
    <div className={`w-full relative`}>
      <input
        placeholder={rest.placeholder}
        className={`w-full rounded-[0.75rem]  p-3 h-10 bg-[#F2F4F7] ${className}`}
        {...rest}
        type={inputType}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() =>
            setInputType(inputType === "password" ? rest?.type : "password")
          }
          className="absolute right-2 top-[20%] "
        >
          {!(inputType === "password") ? (
            <Icon icon="ri:eye-off-fill" className="w-6 h-6" color="#000" />
          ) : (
            <Icon color="#000" icon="lucide:eye" className="w-6 h-6" />
          )}
        </button>
      )}
    </div>
  );
}
