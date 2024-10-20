import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect, useMemo } from "react";

const FoodDeliveryDateSelection = ({
  set_delivery_date,
  delivery_date,
}: {
  set_delivery_date: (value: string) => void;
  delivery_date: string;
}) => {
  const [minDate, setMinDate] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const isWeekendDelivery = useMemo(
    () => searchParams?.get("isWeekend") === "true",
    [router]
  );
  const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const isWeekDay = (date: Date): boolean => {
    const day = date.getDay();
    return [2, 3, 4, 5].includes(day);
  };

  const isMonday = (date: Date): boolean => {
    const day = date.getDay();
    return day === 1;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;
    if (isMonday(new Date(value))) {
      alert("You cannot choose Monday as a delivery day. Please choose another day.");
      return;
    }
    if (isWeekendDelivery && !isWeekend(new Date(value))) {
      alert("Please select a valid weekend date(Saturday or Sunday).");
      return;
    }

    if (!isWeekendDelivery && !isWeekDay(new Date(value))) {
      alert("Please select a valid weekday (Tuesday - Friday) ");
      return;
    }

    set_delivery_date(value);
  };

  const setMinimumDate = () => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 23 || hours < 1) {
      now.setDate(now.getDate() + 1);
    }

    setMinDate(now.toISOString().split("T")[0]);
  };

  useEffect(() => {
    setMinimumDate();

    // Update minDate at the start of every new day
    const interval = setInterval(setMinimumDate, 60 * 1000); // Update every minute

    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  return (
    <div>
      <input
        type="date"
        value={delivery_date || ""}
        onChange={handleDateChange}
        min={minDate}
        disabled={false}
        className="bg-[#F2F4F7] h-[3rem] rounded-[0.75rem] w-full p-2"
      />
    </div>
  );
};

export default FoodDeliveryDateSelection;
