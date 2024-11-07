import Button from "@/components/ui/Button";
import { BREAKPOINT } from "@/config";
import { IExtraItem } from "@/config/types";
import useAuth from "@/hooks/useAuth";
import { DEVICE_ID } from "@/hooks/useFingerPrint";
import useFoodbox from "@/hooks/useFoodbox";
import { ATOMS } from "@/store/atoms";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useMediaQuery } from "react-responsive";

const Option = ({
  extra_id,
  setSelectedExtras,
  selectedExtras,
  isSwallow,
}: {
  extra_id?: string;
  setSelectedExtras: (value: IExtraItem | undefined) => void;
  selectedExtras: IExtraItem | undefined;
  isSwallow: boolean;
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
      const ex = (
        isSwallow
          ? data?.data?.data?.swallow?.data ?? []
          : data?.data?.data?.protein?.data ?? []
      )?.find((e: IExtraItem) => e._id === extra_id);
      setExtra(ex);
    }
  }, [data]);

  const selected = useMemo(() => {
    return selectedExtras?._id === extra_id;
  }, [selectedExtras, extra_id]);

  return isLoading ? (
    <p className="text-center">Loading...</p>
  ) : (
    extra?.name && (
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
    )
  );
};
function ExtraMealSelectionModal() {
  const [extraModal, setExtraModal] = useAtom(ATOMS.showMealExtraSelection);
  const { addExtraItem } = useFoodbox();
  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });

  const [selectedProteinExtras, setSelectedProteinExtras] = useState<
    IExtraItem | undefined
  >(undefined);

  const [selectedSwallowExtras, setSelectedSwallowExtras] = useState<
    IExtraItem | undefined
  >(undefined);

  const onContinue = () => {
    if ((extraModal?.meal?.isSwallow && !selectedSwallowExtras?._id) || (extraModal?.meal?.isProtein && !selectedProteinExtras?._id)) {
      alert("Please select both protein and swallow extras");
      return;
    }
    addExtraItem(selectedSwallowExtras, selectedProteinExtras);

    extraModal.onContinue(
      selectedProteinExtras?._id!,
      selectedSwallowExtras?._id!,
      selectedProteinExtras,
      selectedSwallowExtras,
    );
    setExtraModal({
      show: false,
      meal: undefined,
      day: undefined,
      onContinue: () => {},
    });
  };

  return (
    <div
      className={`z-[999999999999999999] w-full bg-white flex flex-col  py-8 px-3 h-[100vh] overflow-y-scroll ${
        isMobile && "pb-[20rem]"
      }`}
    >
      <div className="h-[30rem] w-full relative">
        <div
          onClick={() =>
            setExtraModal({
              show: false,
              meal: undefined,
              day: undefined,
              onContinue: () => {},
            })
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
          <div>
            {!!extraModal?.meal?.isSwallow && (
              <>
                <p className="text-black-900 font-inter text-sm mt-3">
                  Select swallow
                </p>
                <p className="bg-[#ECF9F3] rounded-[0.25rem] p-[0.3rem] flex justify-center items-center w-fit text-[0.74rem]">
                  Choose one
                </p>
              </>
            )}
            <div className="flex flex-col gap-3 mt-3">
              {extraModal?.meal?.expected_swallows?.map((extra) => (
                <Option
                  key={extra}
                  extra_id={extra}
                  isSwallow
                  selectedExtras={selectedSwallowExtras}
                  setSelectedExtras={setSelectedSwallowExtras}
                />
              ))}
            </div>
          </div>

          <div className="mt-4">
            {!!extraModal?.meal?.isProtein && (
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
                  isSwallow={false}
                  selectedExtras={selectedProteinExtras}
                  setSelectedExtras={setSelectedProteinExtras}
                />
              ))}
            </div>
          </div>
        </>
      </div>

      <Button
        title="Select"
        onClick={onContinue}
        variant="primary"
        className="py-6 h-[2.75rem] mt-4"
      />
    </div>
  );
}

export default ExtraMealSelectionModal;
