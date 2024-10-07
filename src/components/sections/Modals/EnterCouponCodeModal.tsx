import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom } from "jotai";
import { FormEvent, useState } from "react";

export default () => {
  const [coupon, setCoupon] = useState("");
  const [couponState, setCouponState] = useAtom(ATOMS.couponCode);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCouponState({ show: false, value: coupon });
  };
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-4 rounded-md flex flex-col gap-3"
    >
      <div className="flex justify-between items-center">
        <p className="text-lg font-NewSpiritMedium">
          Do you have a coupon code?
        </p>
        <button
          type="button"
          onClick={() => setCouponState({ show: false, value: undefined })}
        >
          <Icon className="w-8 h-8" icon="fluent-mdl2:cancel" />
        </button>
      </div>
      <div>
        <label>Coupon Code</label>
        <Input
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter coupon code here..."
        />
      </div>
      <Button
        title="Submit"
        type="submit"
        variant="primary"
        onClick={() => {}}
      />
    </form>
  );
};
