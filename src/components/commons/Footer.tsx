import Link from "next/link";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import Input from "../ui/Input";
import DownloadApp from "../ui/DownloadApp";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINT } from "@/config";

export default function Footer() {
  const options = [
    {
      title: "COMPANY",
      options: [
        {
          title: "About us",
          link: "/about_us",
        },
        {
          title: "Pricing",
          link: "/pricing",
        },
        {
          title: "Careers",
          link: "/careers",
        },
        {
          title: "Terms of Service",
          link: "/terms_and_conditions",
        },
        {
          title: "Privacy Policy",
          link: "/privacy_policy",
        },
      ],
    },
    {
      title: "OUR FEATURES",
      options: [
        {
          title: "Meal plans",
          link: "/meal_plans",
        },
        {
          title: "Single Meal Orders",
          link: "/single_meals",
        },
        {
          title: "Bulk Meal Orders",
          link: "/bulk_meals",
        },
        {
          title: "Party Plan",
          link: "/party_plan",
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
          link: "/contact_us",
        },
      ],
    },
  ];
  const isMobile = useMediaQuery({ maxWidth:BREAKPOINT});
  return (
    <div className="w-full flex flex-col md:flex-row gap-6 items-center relative overflow-y-hidden mb-4">
      <img
        src="/images/footer_red_bg.png"
        className="w-[39.5rem] h-[39.5rem] absolute right-[40%] -bottom-[5rem] z-0"
      />
      <div className="w-full md:w-[40%] py-8 px-4 rounded-[1rem] bg-black-900 z-50">
        <h4 className="text-white font-NewSpiritBold text-[2rem] md:text-[2.75rem] tracking-[-0.11rem] mb-5">
          Get the latest updates before they happen
        </h4>
        <form className="flex flex-col gap-4 mb-8">
          <Input
            placeholder="Full name"
            className="placeholder:text-sm font-inter text-[#323546]"
          />
          <Input placeholder="Email address" />
        </form>
        <Button fullWidth variant="primary" title="Submit" />
      </div>
      <div className="w-full md:w-[60%] bg-background px-4 py-8 rounded-[1rem] flex flex-col gap-[2.75rem] z-50">
        <Logo className="w-32 h-w-32 object-contain" />
        <div className="grid grid-cols-2 md:flex gap-[3.75rem] ">
          {options.map((option, index) => (
            <div
              className="flex-1 flex flex-col gap-8"
              key={`footer_option_${index}`}
            >
              <h4 className="font-inter font-bold text-lg text-black-900 leading-[1.6875rem]">
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
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-center">
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
