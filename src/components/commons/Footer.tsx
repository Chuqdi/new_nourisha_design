"use client";
import { BREAKPOINT } from "@/config";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import Button from "../ui/Button";
import DownloadApp from "../ui/DownloadApp";
import Input from "../ui/Input";
import Logo from "../ui/Logo";
import useSocials from "@/hooks/useSocials";

export default function Footer() {
  const socials = useSocials();
  const options = [
    {
      title: "COMPANY",
      options: [
        {
          title: "About us",
          link: "/about-us",
        },
        // {
        //   title: "Pricing",
        //   link: "/pricing",
        // },

        {
          title: "Terms of Service",
          link: "/terms-and-conditions",
        },
        {
          title: "Privacy Policy",
          link: "/privacy-policy",
        },
      ],
    },
    {
      title: "OUR FEATURES",
      options: [
        {
          title: "Meal plans",
          link: "/meal-plans",
        },
        {
          title: "Single Meal Orders",
          link: "/single-meals",
        },
        {
          title: "Bulk Meal Orders",
          link: "/bulk-meals",
        },
        {
          title: "Party Plan",
          link: "/party-meal-plans",
        },
      ],
    },
    {
      title: "HELP",
      options: [
        {
          title: "FAQ",
          link: "/faq",
        },
        {
          title: "Contact us",
          link: "/contact-us",
        },
      ],
    },
  ];

  const isMobile = useMediaQuery({ maxWidth: BREAKPOINT });
  return (
    <div className="w-full flex flex-col md:flex-row gap-6 items-stretch h-auto relative overflow-y-hidden mb-4">
      <img
        src="/images/footer_red_bg.png"
        className="w-[39.5rem] h-[45.5rem] absolute right-[40%] top-[10rem] z-0 object-cover"
      />
      <div
        style={{
          backgroundImage: "url(/images/footer_dark_bg.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="w-full flex flex-col  justify-center md:w-[35%] py-8 px-4 rounded-[1rem]  z-50"
      >
        <h4 className="text-white font-NewSpiritBold text-[2rem] md:text-[2.75rem] tracking-[-0.11rem] mb-5 w-3/5 md:w-full">
          Get the latest updates before they happen
        </h4>
        <form name="get_update_form" className="flex flex-col gap-4 mb-8">
          <Input
            placeholder="Full name"
            className="placeholder:text-sm font-inter text-[#323546]"
          />
          <Input placeholder="Email address" />
        </form>
        <Button
          fullWidth
          variant="primary"
          title="Submit"
          className="h-[3rem] mt-3 font-bold font-inter"
        />
      </div>
      <div className="w-full md:w-[65%] bg-background px-4 py-8 rounded-[1rem] flex flex-col gap-[2.75rem] z-50">
        <Logo className="w-32 h-w-32 object-contain" />
        <div className="grid grid-cols-2 md:flex gap-[1.75rem] ">
          {options.map((option, index) => (
            <div
              className="flex-1 flex flex-col gap-8"
              key={`footer_option_${index}`}
            >
              <h4 className="font-inter font-bold text-base text-black-900 leading-[1.6875rem]">
                {option.title}
              </h4>
              <div className="flex flex-col gap-4">
                {option.options.map((link, i) => (
                  <Link
                    className="text-base text-black-900 leading-[1.5rem] tracking-[-0.015rem] block"
                    key={`link_option_${i}`}
                    href={link.link}
                  >
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="flex-1 flex flex-col gap-8">
            <h4 className="font-inter font-bold text-base text-black-900 leading-[1.6875rem] uppercase">
              Socials
            </h4>
            <div className="flex flex-col gap-4">
              {socials.map((link, i) => (
                <Link
                  className=" leading-[1.5rem] tracking-[-0.015rem] gap-2 text-base  text-black-900 flex items-center"
                  key={`link_option_${i}`}
                  href={link.link}
                  target="__blank"
                >
                  <Icon className="w-6 h-6" icon={link.icon} color="" />
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:gap-0 md:flex-row justify-between md:items-center ">
          <DownloadApp />
          <p className="text-black-900 text-base tracking-[-0.015rem] leading-[1.5rem] ">
            Get in touch at{" "}
            <span className="underline font-bold">hello@eatnourisha.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
