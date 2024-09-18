"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import Button from "@/components/ui/Button";
import MessageBtn from "@/components/ui/MessageBtn";
import useSocials from "@/hooks/useSocials";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export default function Main() {
  const socials = useSocials();
  return (
    <div className="w-full h-full relative pt-6 ">
      <Navbar />

      <div className="mx-1.25 md:mx-6.25 flex flex-col gap-8 mt-[6rem] bg-[#F3F9EC] p-4 md:p-14 rounded-[2rem]">
        <MessageBtn title="CONTACT US" />
        <h3 className="font-NewSpiritBold text-[2rem] md:text-[4.5rem] text-center text-[#7DB83A] w-full md:w-[70%] mx-auto">
          We would love to hear from you.
        </h3>

        <div className="flex gap-8 md:gap-0 flex-col md:flex-row">
          <div className="flex-1">
            <div className="w-full md:w-[70%] flex flex-col gap-[3.25rem]">
              <div>
                <h3 className="text-2xl font-NewSpiritBold text-black-900">
                  Chat with our friendly team
                </h3>
                <p className="text-lg font-inter text-black-900 tracking-[-0.01688rem] leading-[1.6875rem]">
                  Need support? Have a question? Running into a problem? We’re
                  here to help.
                </p>
              </div>

              <div className="">
                <h6 className="text-black-900 font-inter text-sm font-semibold">
                  Email us at:
                </h6>
                <p className="text-base text-black-900 font-inter">
                  hello@eatnourisha.com
                </p>
              </div>

              <div className="">
                <h6 className="text-black-900 font-inter text-sm font-semibold">
                  Call us on
                </h6>
                <p className="text-base text-black-900 font-inter">
                  020 8058 3407
                </p>
              </div>

              <div className="flex-1 flex flex-col ">
                <h6 className="text-black-900 font-inter text-sm font-semibold">
                  Socials
                </h6>
                <div className="flex flex-row gap-4">
                  {socials.map((link, i) => (
                    <Link
                      className=" leading-[1.5rem] tracking-[-0.015rem] gap-2 text-base  text-black-900 flex items-center"
                      key={`link_option_${i}`}
                      href={link.link}
                    >
                      <Icon className="w-6 h-6" icon={link.icon} color="" />
                      {link.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div></div>
            </div>
          </div>

          <form className="flex-1 px-4 py-6 bg-white rounded-[2rem] flex flex-col gap-6">
            <div>
              <label>Full name</label>
              <input
                type="text"
                placeholder="Please enter full name"
                className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem] p-3 block w-full"
              />
            </div>

            <div>
              <label>Email address</label>
              <input
                type="email"
                placeholder="Please enter email address"
                className="bg-[#F2F4F7] rounded-[0.75rem] h-[3rem] p-3 block w-full"
              />
            </div>

            <div>
              <label>Message</label>
              <textarea
                placeholder="Please enter your message"
                className="bg-[#F2F4F7] h-[9.4375rem] w-full rounded-[0.75rem] p-2"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <div className="w-full md:w-[30%]">
                <Button
                  className="h-[3rem]"
                  fullWidth
                  variant="primary"
                  title="Send"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="w-full my-[3rem]">
        <img src="/images/zigzag.png" className="w-full" />
      </div>
      <DownloadTheAppWidgetSection />
      <div className="mx-1.25 md:mx-6.25 mt-6.25">
        <Footer />
      </div>
    </div>
  );
}
