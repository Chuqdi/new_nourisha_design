import { Icon } from "@iconify/react/dist/iconify.js";

export default function Ratings() {
    return [1, 2, 3, 4].map((rate, index) => (
      <div
        className="bg-[#00B67A] h-8 w-8 flex justify-center items-center"
        key={`home_page_rating_${index}`}
      >
        {/* TODO: Change star icons */}
        <Icon color="#fff" icon="streamline:star-1-solid" />
      </div>
    ));
  };