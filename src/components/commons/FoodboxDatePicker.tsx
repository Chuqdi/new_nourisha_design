import React from "react";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useSearchParams } from "next/navigation";

interface FoodDeliveryDateSelectionProps {
  set_delivery_date: (value: string) => void;
  delivery_date: string;
}

const FoodDeliveryDateSelection: React.FC<FoodDeliveryDateSelectionProps> = ({
  set_delivery_date,
  delivery_date,
}) => {
  const searchParams = useSearchParams();
  const isWeekendDelivery = searchParams?.get("isWeekend") === "true";

  // Determine minimum selectable date based on current time
  const getMinSelectableDate = () => {
    const now = dayjs();
    // If it's past 12 PM, set minimum date to the day after tomorrow
    // Otherwise, set to tomorrow
    return now.hour() >= 12
      ? now.add(2, "day").startOf("day")
      : now.add(1, "day").startOf("day");
  };

  // Disable dates based on delivery type
  const disabledDate = (current: Dayjs) => {
    // If no date selected, use current date
    const minDate = getMinSelectableDate();

    // Ensure date is not before minimum selectable date
    if (current.isBefore(minDate, "day")) {
      return true;
    }

    // Weekend delivery logic
    if (isWeekendDelivery) {
      // Only allow Saturdays
      return current.day() !== 6;
    } else {
      // Disable weekend dates
      return [0, 6].includes(current.day());
    }
  };

  // Handle date change
  const handleDateChange = (date: Dayjs | null) => {
    if (!date) return;

    // Validate date selection
    const selectedDate = date.format("YYYY-MM-DD");

    // Additional validation can be added here if needed
    set_delivery_date(selectedDate);
  };

  return (
    <>
      <DatePicker
        className="w-full h-[3rem]"
        style={{
          backgroundColor: "#F2F4F7",
          borderRadius: "0.75rem",
          height: "3rem",
          padding: "0.5rem",
        }}
        popupStyle={{ zIndex: 9999999999 }}
        format="YYYY-MM-DD"
        value={delivery_date ? dayjs(delivery_date) : null}
        onChange={handleDateChange}
        disabledDate={disabledDate}
        placeholder="Select delivery date"
        allowClear={false}
      />
      {isWeekendDelivery && (
        <p className="text-xs text-gray-500 mt-1">
          Only Saturdays are available
        </p>
      )}
      {!isWeekendDelivery && (
        <p className="text-xs text-gray-500 mt-1">
          Only weekday dates (Tuesday-Friday) are available
        </p>
      )}
    </>
  );
};

export default FoodDeliveryDateSelection;
