import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/Textarea";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function RequestQuoteModal({ close }:{ close:()=> void }) {
  return (
    <div className="w-full bg-background relative  gap-6  rounded-[1rem] py-8 px-6 flex flex-col h-[40em] overflow-y-scroll">
     <button onClick={close}>
     <Icon color="#fff" className="text-4xl absolute right-0" icon="material-symbols-light:cancel" />
     </button>
      <div className="flex flex-col gap-3">
        <h3 className="text-black-900 font-NewSpiritBold text-[2.75rem] ">
          Request quote
        </h3>
        <p className="font-inter text-base text-black-900 tracking-[-0.015rem] leading-[1.5rem]">
          Please provide us with some details to get started. Fill out the form
          below, and we{"'"}ll be in touch with a menu proposal that suits your
          event perfectly.
        </p>
      </div>

      <form className="flex gap-6 flex-col">
        <div className="flex flex-col gap-1">
          <label>Full name</label>
          <Input className="rounded-[0.75rem]" />
        </div>

        <div className="flex flex-col gap-1">
          <label>Email address</label>
          <Input className="rounded-[0.75rem]" />
        </div>

        <div className="flex flex-col gap-1">
          <label>Phone number</label>
          <Input type="tel" className="rounded-[0.75rem]" />
        </div>

        <div className="flex flex-col gap-1">
          <label>Event date</label>
          <Input type="date" className="rounded-[0.75rem]" />
        </div>

        <div className="flex flex-col gap-1">
          <label>Event type</label>
          <Input className="rounded-[0.75rem]" />
        </div>

        <div className="flex flex-col gap-1">
          <label>Event type</label>
          <Input type="number" className="rounded-[0.75rem]" />
        </div>

        <div className="flex flex-col gap-1">
          <label>Address</label>
          <Input type="number" className="rounded-[0.75rem]" />
        </div>

        <div className="flex flex-col gap-1">
          <label>Enter the meals you want</label>
          <TextArea />
        </div>
      </form>
    </div>
  );
}
