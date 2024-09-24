import { IMeal } from "@/config/types";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom, useAtomValue } from "jotai";

const FoodInfoModal = () => {
  const [foodInfoModal, setFoodInfoModal] = useAtom(ATOMS.foodInfoModal);
  const { meal, show } = foodInfoModal;
  return (
    <div className="bg-white p-4 rounded-[1rem]  max-h-[90vh] overflow-y-scroll">
      <div className="flex justify-between items-center">
        <h3 className="text-black-900 font-NewSpiritBold text-[2rem]">
          Food info
        </h3>
        <button
          onClick={() => setFoodInfoModal({ show: false, meal: {} as IMeal })}
          className="bg-black flex justify-center items-center p-1 rounded-full"
        >
          <Icon
            width="1.2em"
            height="1.2em"
            color="#fff"
            icon="iconoir:cancel"
          />
        </button>
      </div>
      <div
        style={{
          backgroundImage: `url(${meal?.image_url})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="h-[16.3125rem] w-full rounded-[0.5rem]"
      />
      <h3 className="text-black-900 text-[1.5rem] tracking-[-0.045rem] leading-[1.95rem] font-NewSpiritBold">
        {meal?.name}
      </h3>

      <div className="grid grid-cols-4 mt-5 gap-3">
        <div className="flex-1 bg-[#DEF54C] rounded-[0.5rem] py-[0.75rem] px-[0.5rem] flex justify-center items-center flex-col">
          <h4 className="text-black-900 text-base font-NewSpiritBold">
            485 kcal
          </h4>
          <p className="text-[#323546] font-inter font-base">CALORIES</p>
        </div>

        <div className="flex-1 bg-[#DEF54C] rounded-[0.5rem] py-[0.75rem] px-[0.5rem] flex justify-center items-center flex-col">
          <h4 className="text-black-900 text-base font-NewSpiritBold">
            485 kcal
          </h4>
          <p className="text-[#323546] font-inter font-base">CALORIES</p>
        </div>



        <div className="flex-1 bg-[#DEF54C] rounded-[0.5rem] py-[0.75rem] px-[0.5rem] flex justify-center items-center flex-col">
          <h4 className="text-black-900 text-base font-NewSpiritBold">
            485 kcal
          </h4>
          <p className="text-[#323546] font-inter font-base">CALORIES</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-5">
        <div>
          <h4 className="text-black-900 text-[1.5rem] font-NewSpiritBold">
            Ingredients
          </h4>
          <p className="text-[#323546] font-inter text-[1.25rem]">
            Lorem ipsum sit amet dolor relictum expurgartionis isssisisiisis
            isiinferalis, Lorem ipsum sit amet dolor relictum expurgartionis
            inferalis Lorem ipsum sit amet
          </p>
        </div>

        <div>
          <h4 className="text-black-900 text-[1.5rem] font-NewSpiritBold">
            Allergens
          </h4>
          <p className="text-[#323546] font-inter text-[1.25rem]">
            GLUTEN, SESAME, SOYA
          </p>
        </div>

        <div>
          <h4 className="text-black-900 text-[1.5rem] font-NewSpiritBold">
            Cooking instreuctions
          </h4>
          <p className="text-[#323546] font-inter text-[1.25rem]">
            Lorem ipsum sit amet dolor relictum expurgartionis isssisisiisis
            isiinferalis, Lorem ipsum sit amet dolor relictum expurgartionis
            inferalis Lorem ipsum sit amet
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodInfoModal;