import Button from "@/components/ui/Button";
import { IExtraItem } from "@/config/types";
import useAuth from "@/hooks/useAuth";
import { DEVICE_ID } from "@/hooks/useFingerPrint";
import useFoodbox from "@/hooks/useFoodbox";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

const Option = ({
  extra_id,
  setSelectedExtras,
  selectedExtras,
}: {
  extra_id?: string;
  setSelectedExtras: (value: IExtraItem | undefined) => void;
  selectedExtras: IExtraItem | undefined;
}) => {
  const id = localStorage.getItem(DEVICE_ID);
  const { getAxiosClient } = useAuth();
  const axiosClient = getAxiosClient(id!);
  const [extra, setExtra] = useState<undefined | IExtraItem>(undefined);

  const getPlans = () => {
    return axiosClient.get(`meals/extras`);
  };

  const { data, isLoading } = useQuery("GET_EXTRAS" + extra_id, getPlans);

  useEffect(() => {
    if (data?.data?.data) {
      const ex = ([...(data?.data?.data?.swallow?.data ?? []),...(data?.data?.data?.protein?.data ?? [])]).find(
        (e: IExtraItem) => e._id === extra_id
      );
      setExtra(ex);
    }
  }, [data]);

  const selected = useMemo(() => {
    return selectedExtras?._id === extra_id;
  }, [selectedExtras, extra_id]);

  return isLoading ? (
    <p className="text-center">Loading...</p>
  ) : (
    <div
      onClick={() => {
        setSelectedExtras(selected ? undefined : extra);
      }}
      className={`w-full p-4 rounded-[0.75rem] border-[2px] z-0 ${
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

  const [selectedExtras, setSelectedExtras] = useState<IExtraItem | undefined>(
    undefined
  );


  return (
    <div className="w-full bg-white flex flex-col  py-8 px-3 h-[100vh] overflow-y-scroll">
      <div className="h-[30rem] w-full relative">
        <div
          onClick={() =>
            setExtraModal({ show: false, meal: undefined, day: undefined })
          }
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

        <>
          {extraModal?.meal?.name?.toUpperCase()?.includes("SOUP") && (
            <div>
              {!!extraModal?.meal?.expected_swallow?.length && (
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
                  {extraModal?.meal?.expected_swallow?.map((extra) => (
                    <Option
                      key={extra}
                      extra_id={extra}
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
              {!!extraModal?.meal?.expected_proteins?.length && (
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
                {extraModal?.meal?.expected_proteins?.map((extra) => (
                  <Option
                    key={extra}
                    extra_id={extra}
                    selectedExtras={selectedExtras}
                    setSelectedExtras={setSelectedExtras}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      </div>

      <Button
        title="Select"
        onClick={() => {
          addExtraItem(selectedExtras);
          setExtraModal({ show: false, meal: undefined, day: undefined });
        }}
        variant="primary"
        className="py-6 h-[2.75rem] mt-4"
      />
    </div>
  );
}

export default ExtraMealSelectionModal;
