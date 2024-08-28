"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import DownloadTheAppWidgetSection from "@/components/sections/DownloadTheAppWidgetSection";
import MessageBtn from "@/components/ui/MessageBtn";

export default function PrivacyPolicyPage() {
  const headerText = "font-inter text-black-900 font-bold text-[1.5rem]";
  const normalText = "text-[#323546] font-inter text-lg";
  return (
    <div className="w-full h-full relative pt-6">
      <Navbar />
      <div className="flex flex-col gap-6 mt-32 mx-1.25 md:mx-6.25 bg-[#F3F9EC] rounded-[2rem] py-8 px-[3.5rem]">
        <MessageBtn title="LAST UPDATED 18-07-2023" />
        <h3 className="text-center font-NewSpiritBold text-primary-Green-900 text-[2rem] md:text-[4.5rem]">
          Privacy Policy
        </h3>
      </div>

      <div className="mx-1.25 md:mx-6.25 my-20 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h4 className={headerText}>Privacy Policy</h4>
          <p className={normalText}>
            Welcome to Nourisha!
            <br />
            These terms and conditions outline the rules and regulations for the
            use of Nourisha’s Website, located at https://nourisha.com/. By
            accessing this website we assume you accept these terms and
            conditions. Do not continue to use nourisha if you do not agree to
            take all of the terms and conditions stated on this page. The
            following terminology applies to these Terms and Conditions, Privacy
            Statement and Disclaimer Notice and all Agreements: “Client”, “You”
            and “Your” refers to you, the person log on this website and
            compliant to the Company’s terms and conditions. “The Company”,
            “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”,
            “Parties”, or “Us”, refers to both the Client and ourselves. All
            terms refer to the offer, acceptance and consideration of payment
            necessary to undertake the process of our assistance to the Client
            in the most appropriate manner for the express purpose of meeting
            the Client’s needs in respect of provision of the Company’s stated
            services, in accordance with and subject to, prevailing law. Any use
            of the above terminology or other words in the singular, plural,
            capitalization and/or he/she or they, are taken as interchangeable
            and therefore as referring to same.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className={headerText}>Cookies</h4>
          <p className={normalText}>
            We employ the use of cookies. By accessing Nourisha you agreed to
            use cookies in agreement with the nourisha’s Privacy Policy. Most
            interactive websites use cookies to let us retrieve the user’s
            details for each visit. Cookies are used by our website to enable
            the functionality of certain areas to make it easier for people
            visiting our website.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className={headerText}>Licenses and Restrictions</h4>
          <div className="mt-4">
            <h6 className="text-black-900 font-inter text-lg font-semibold flex items-center gap-2">
              <p className="w-2 h-2 bg-black-900 rounded-full" />
              Licenses
            </h6>
            <p className={normalText}>
              We employ the use of cookies. By accessing Nourisha you agreed to
              use cookies in agreement with the nourisha’s Privacy Policy. Most
              interactive websites use cookies to let us retrieve the user’s
              details for each visit. Cookies are used by our website to enable
              the functionality of certain areas to make it easier for people
              visiting our website.
            </p>
          </div>

          <div className="mt-4">
            <h6 className="text-black-900 font-inter text-lg font-semibold flex items-center gap-2">
              <p className="w-2 h-2 bg-black-900 rounded-full" />
              Restrictions
            </h6>
            <p className={normalText}>
              The rights granted to you in the Terms are subject to the
              following restrictions: (a) you shall not license, sell, rent,
              lease, transfer, assign, reproduce, distribute, host or otherwise
              commercially exploit the Website, Apps, back-end databases or
              Services (collectively, the “Company Properties”) or any portion
              of the Company Properties; (b) you shall not frame or utilize
              framing techniques to enclose any trademark, logo, or other
              Company Properties (including images, text, page layout or form)
              of Company; (c) you shall not use any metatags or other “hidden
              text” using Company’s name or trademarks; (d) you shall not
              modify, translate, adapt, merge, make derivative works of,
              disassemble, decompile, reverse compile or reverse engineer any
              part of the Company Properties except to the extent the foregoing
              restrictions are expressly prohibited by applicable law; (e) you
              shall not use any manual or automated software, devices or other
              processes (including but not limited to spiders, robots, scrapers,
              crawlers, avatars, data mining tools or the like) to “scrape” or
              download data from any web pages contained in the Website (except
              that we grant the operators of public search engines revocable
              permission to use spiders to copy materials from the Website for
              the sole purpose of and solely to the extent necessary for
              creating publicly available searchable indices of the materials,
              but not caches or archives of such materials); (f) access the
              Company Properties in order to build a similar or competitive
              website, application or service; (g) except as expressly stated
              herein, no part of the Company Properties may be copied,
              reproduced, distributed, republished, downloaded, displayed,
              posted or transmitted in any form or by any means; (h) you shall
              not remove or destroy any copyright notices or other proprietary
              markings contained on or in the Company Properties; and (i) you
              shall not use the Company Properties for any illegal or unlawful
              purpose. Any unauthorized use of the Company Properties terminates
              the licenses granted by the Company pursuant to the Terms.
            </p>
          </div>

          <div className="mt-4">
            <h6 className="text-black-900 font-inter text-lg font-semibold flex items-center gap-2">
              <p className="w-2 h-2 bg-black-900 rounded-full" />
              Updates
            </h6>
            <p className={normalText}>
            All updates and upgrades to the App will be governed by the version of these Terms published by Company as of the date you install such update or upgrade. You agree, however, that we are not obligated to create or provide any support, corrections, updates, upgrades, bug fixes and/or enhancements of the App or for the Service. Any rights not expressly granted herein are reserved.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className={headerText}>Reservation of Rights</h4>
          <p className={normalText}>
          We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className={headerText}>Removal of link from our Websites</h4>
          <p className={normalText}>
          If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.<br />
          We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className={headerText}>Feedback</h4>
          <p className={normalText}>
          If you provide Company with any feedback or suggestions regarding the App, Tasks or Services (“Feedback”), you hereby assign to Company all rights in the Feedback and agree that Company shall have the right to use such Feedback and related information in any manner it deems appropriate without any right to any compensation. Company will treat any Feedback you provide to Company as non-confidential and non-proprietary. You agree that you will not submit to Company any information or ideas that you consider to be confidential or proprietary.
          </p>
        </div>
      </div>

     <div className="mx-1.25 md:mx-6.25 mt-8">
        <Footer />
     </div>
    </div>
  );
}
