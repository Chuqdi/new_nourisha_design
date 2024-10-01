import Button from "@/components/ui/Button";
import { IExtraItem } from "@/config/types";
import useAuth from "@/hooks/useAuth";
import useFoodbox from "@/hooks/useFoodbox";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

const Option = ({
  extra,
  setSelectedExtras,
  selectedExtras,
}: {
  extra?: IExtraItem;
  setSelectedExtras: (value: IExtraItem|undefined) => void;
  selectedExtras: IExtraItem|undefined;
}) => {
  const selected = useMemo(() => {
    return selectedExtras?._id === extra?._id;
  }, [selectedExtras, extra]);

  return (
    <div
      onClick={() => {
        setSelectedExtras(
          selected
            ? undefined
            :extra
        );
      }}
      className={`w-full p-4 rounded-[0.75rem] border-[2px] ${
        selected ? "border-[#FE7E00]" : "border-[#EDEDF3]"
      } flex justify-between items-center`}
    >
      <p className="text-black-900 font-inter text-sm ">{extra?.name}</p>
      {selected ? (
        <div className="bg-[#FE7E00] rounded-full w-6 h-6 flex justify-center items-center">
          <Icon className="w-4 h-4" color="#fff" icon="ic:sharp-check" />
        </div>
      ) : (
        <button className="bg-[#FFEAD6] w-6 h-w-6 flex justify-center items-center text-[#FE7E00] rounded-full font-bold">
          +
        </button>
      )}
    </div>
  );
};
function ExtraMealSelectionModal() {
  const [extraModal, setExtraModal] = useAtom(ATOMS.showMealExtraSelection);
  const { addExtraItem } = useFoodbox();
  const { axiosClient } = useAuth();
  const [extras, setExtras] = useState<{
    protein: { data: IExtraItem[]; totalCount: number };
    swallow: { totalCount: number; data: IExtraItem[] };
  }>({
    protein: { data: [], totalCount: 0 },
    swallow: { data: [], totalCount: 0 },
  });
  const [selectedExtras, setSelectedExtras] = useState<IExtraItem|undefined>(undefined);

  const getPlans = () => {
    return axiosClient.get("meals/extras");
  };

  const { data, isLoading } = useQuery("GET_EXTRAS", getPlans);

  useEffect(() => {
    if (data?.data?.data) {
      setExtras(data?.data?.data);
    }
  }, [data]);

  return (
    <div className="w-full bg-white flex flex-col  py-8 px-3 h-[100vh] overflow-y-scroll">
      <div className="h-[30rem] w-full relative">
        <div
          onClick={() => setExtraModal({ show: false, meal: undefined, day:undefined })}
          className="cursor-pointer w-6 h-6 justify-center flex rounded-full items-center bg-black absolute right-4 top-4 "
        >
          <Icon color="#fff" icon="proicons:cancel" />
        </div>
        <div className="absolute bg-white text-sm text-black-900 text-center w-[5rem] p-2 flex justify-center items-center rounded-[0.75rem] bottom-10 left-4">
          {extraModal?.meal?.calories}KCal
        </div>
        <img
          className="h-[28rem] rounded-[0.75rem] w-full object-cover"
          src={extraModal?.meal?.image_url}
        />
      </div>

      <div>
        <h3 className="text-black-900 font-inter text-[1.25rem] font-[500]">
          {extraModal?.meal?.name}
        </h3>
        {isLoading ? (
          <p className="text-center text-sm font-inter ">Loading...</p>
        ) : (
          <>
            {extraModal?.meal?.name?.toUpperCase()?.includes("SOUP") && (
              <div>
                {!!extras?.swallow?.totalCount && (
                  <>
                    <p className="text-black-900 font-inter text-sm mt-3">
                      Select swallow
                    </p>
                    <p className="bg-[#ECF9F3] rounded-[0.25rem] p-[0.3rem] flex justify-center items-center w-fit text-[0.74rem]">
                      Choose one
                    </p>
                  </>
                )}
                {extraModal?.meal?.name?.toUpperCase()?.includes("SOUP") && (
                  <div className="flex flex-col gap-3 mt-3">
                    {extras?.swallow?.data?.map((extra) => (
                      <Option
                        key={extra?._id}
                        extra={extra}
                        selectedExtras={selectedExtras}
                        setSelectedExtras={setSelectedExtras}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {extraModal?.meal?.name?.toUpperCase()?.includes("RICE") && (
              <div className="mt-4">
                {!!extras?.protein?.totalCount && (
                  <>
                    <p className="text-black-900 font-inter text-sm mt-3">
                      Select protein
                    </p>
                    <p className="bg-[#ECF9F3] rounded-[0.25rem] p-[0.3rem] flex justify-center items-center w-fit text-[0.74rem]">
                      Choose one
                    </p>
                  </>
                )}

                <div className="flex flex-col gap-3 mt-3">
                  {extras?.protein?.data?.map((extra) => (
                    <Option
                      key={extra?._id}
                      extra={extra}
                      selectedExtras={selectedExtras}
                      setSelectedExtras={setSelectedExtras}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {!isLoading && (
        <Button
          title="Select"
          onClick={() => {
            addExtraItem(selectedExtras,);
            setExtraModal({ show: false, meal: undefined, day: undefined });
          }}
          variant="primary"
          className="py-6 h-[2.75rem] mt-4"
        />
      )}
    </div>
  );
}

export default ExtraMealSelectionModal;
