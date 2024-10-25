import { IUser } from "@/config/types";
import { UserContext } from "@/HOC/UserContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import  { useContext, useState } from "react";

function ReferalInput() {
  const [copied, setCopied] = useState(false);
  const { user } = useContext(UserContext);




  return (
    <div className="w-full flex gap-3 mt-4">
      <div className="w-[70%] relative">
        <input
          type="text"
          readOnly
          value={user?.ref_code}
          className="bg-white rounded-[0.5rem] w-full h-[3rem] p-3"
        />
        <p
          onClick={() => {
            navigator.clipboard.writeText(user?.ref_code!);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
          className="absolute right-[0.6rem] top-[0.8rem] text-sm font-bold font-inter text-[#303237] cursor-pointer"
        >
          {copied ? "Copied!" : "Copy"}
        </p>
      </div>
      <button className="flex items-center bg-primary-orange-900 justify-center rounded-[0.5rem] text-white font-inter w-[30%]">
        <Icon color="#fff" className="w-6 h-6" icon="tabler:send" />
        Share
      </button>
    </div>
  );
}

export default ReferalInput;
