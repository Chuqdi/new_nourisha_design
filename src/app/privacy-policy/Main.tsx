"use client";
import Footer from "@/components/commons/Footer";
import Navbar from "@/components/commons/Navbar";
import MessageBtn from "@/components/ui/MessageBtn";

export default function Main() {
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

      <div className="mx-1.25 md:mx-6.25 my-20 ">
        <div className="flex flex-col gap-8">
          <div className="who">
            <h1 className={headerText}>Who we are</h1>
            <p className={normalText}>
              Nourisha is a business trading under House of Nourisha Limited, a
              company registered in England and Wales with whose registered
              office is at 71-75 Shelton Street, Covent Garden, London, United
              Kingdom, WC2H 9JQ. All references to “Nourisha”, “us” or “we”
              throughout this statement is to the business in the House of
              Nourisha who you are dealing with.
            </p>
            <p className={normalText}>
              Nourisha, uses and is responsible for certain personal information
              about you which is processed in accordance with this statement.
              Please contact us using the details below if you have any
              questions on these terms or the service that we provide.
            </p>
          </div>
          <div className="what">
            <h2 className={headerText}>What information we hold about you</h2>
            <p className={normalText}>
              We collect personal information whenever you provide it to us.
              This personal information may include the following:
            </p>
            <ul className="flex flex-col gap-3 list-disc pl-6">
              <li>name, postal address and contact details;</li>
              <li>your academic history including qualifications;</li>
              <li>payment details;</li>
              <li>
                technical and analytical information obtained through cookies;
              </li>
              <li>other information you provide to us; and</li>
            </ul>
            <p className={normalText}>
              We may also obtain information from third parties such as credit
              reference agencies.
            </p>
          </div>
          <div className="how-we">
            <h2 className={headerText}>How we use your information</h2>
            <p className={normalText}>
              We use your information for the following purposes
            </p>
            <ul className="flex flex-col gap-3 list-disc pl-6">
              <li>
                responding to any enquiries which you make to us relating to any
                of our products or services;
              </li>
              <li>
                in certain circumstances, to carry out a credit reference search
                in order to establish your financial suitability for our
                training services;
              </li>
              <li>to process and administer your payments;</li>
              <li>to provide training services to you;</li>
              <li>
                to monitor site usage to develop and administer our websites;
                and
              </li>
              <li>
                to provide you with promotional information about our training
                services, news, advice, and offers
              </li>
            </ul>
            <p className={normalText}>
              When you submit an enquiry form, you consent to our cookie policy,
              whereby certain information may be automatically collected from
              your device. Collecting this information enables us to better
              understand our website visitors and what content on our website is
              of interest to them. We use this information for our internal
              analytics purposes and to improve the quality and relevance of our
              website to our visitors. The cookies collect information in a way
              that does not directly identify anyone. For more information, view
              our cookie policy.
            </p>
          </div>
          <div className="who-we">
            <h2 className={headerText}>
              Who we may share your information with
            </h2>
            <p className={normalText}>
              We may disclose your personal information to:
            </p>
            <ul className="flex flex-col gap-3 list-disc pl-6">
              <li>our franchise partners;</li>
              <li>our agents and service providers;</li>
              <li>our infrastructure providers;</li>
              <li>a third party who acquires our business;</li>
              <li>examination boards;</li>
              <li>
                the appropriate business within House of Nourisha network;
              </li>
              <li>House of Nourisha;</li>
              <li>
                law enforcement and regulatory agencies in connection with any
                investigation to help prevent unlawful activity or as otherwise
                required by law; and
              </li>
              <li>
                sponsors who have funded studies regarding results and
                attendance only.
              </li>
            </ul>
          </div>
          <div className="keeping">
            <h2 className={headerText}>Keeping your information secure</h2>
            <p className={normalText}>
              We will use technical and organisational measures to safeguard
              your personal data, for example we store your personal data on
              secure servers and ensure access to your personal data is limited
              to authenticated and approved staff.
            </p>
            <p className={normalText}>
              While we will use all reasonable efforts to safeguard your
              personal data, you acknowledge that the use of the internet is not
              entirely secure and for this reason we cannot guarantee the
              security or integrity of any personal data that are transferred
              from you or to you via the internet.
            </p>
          </div>
          <div className="reasons-we">
            <h2 className={headerText}>
              Reasons we collect and use your personal information
            </h2>
            <p className={normalText}>
              We may use your information in the following ways:
            </p>
            <ul className="flex flex-col gap-3 list-disc pl-6">
              <li>where it is necessary to perform our contract with you;</li>
              <li>where it is required by law;</li>
              <li>
                where you have provided consent, provided that you can withdraw
                this consent at any time; or
              </li>
              <li>
                where it is necessary for our legitimate interests as a business
                including:
              </li>
              <li>responding to enquiries</li>
              <li>providing training services to our customers</li>
              <li>improving and developing our services</li>
              <li>the administration of our business</li>
              <li>monitoring and maintaining standards within Nourisha</li>
              <li>establishing, exercising or defending our legal rights</li>
            </ul>
          </div>
          <div className="cookies">
            <h2 className={headerText}>Cookies</h2>
            <p className={normalText}>
              We use cookies and similar tracking technology on our websites
              which enable us to collect statistical data about your use of our
              website. This enables us to enhance and develop our website to
              improve your use of it. For more information on the cookies which
              we utilise on our website please refer to our cookies policy.
            </p>
            <p className={normalText}>
              For more information, including how to disable/delete cookies,
              please go to <strong> www.allaboutcookies.org</strong>
            </p>
          </div>
          <div className="transfer">
            <h2 className={headerText}>Transfer of data out of the EEA</h2>
            <p className={normalText}>
              We adhere to all legislation of the land in relation to the most
              up-to-date information issued on GDPR. This includes all
              information available at the{" "}
              <strong>UK Government website</strong> and the{" "}
              <strong>UK Independent Authority website.</strong>
            </p>
            <p className={normalText}>
              Information that we collect from you may be transferred to third
              party service providers working for us who may process that
              information at a destination inside or outside of the European
              Economic Area (‘EEA’).
            </p>
            <p className={normalText}>
              These destinations may not have the same legal protections for
              personal data as you enjoy under English law. We will take all
              steps reasonably necessary to ensure that your data is treated
              securely and in accordance with this privacy statement and data
              protection legislation.{" "}
            </p>
            <p className={normalText}>
              Please contact us if you want further information on this matter.
            </p>
          </div>
          <div className="retention">
            <h2 className={headerText}>Retention of information</h2>
            <p className={normalText}>
              We will retain your information for no longer than is necessary
              for the purposes for which we collected it, or for as long as we
              have your consent to do so where your consent is our legal basis
              on which we process such data. All retained data will be held
              subject to this policy.
            </p>
          </div>
          <div className="changes">
            <h2 className={headerText}>Changes to this policy</h2>
            <p className={normalText}>
              We may change this policy from time to time. You should check this
              policy frequently to ensure you are aware of the most recent
              version that will apply each time you interact with us.
            </p>
          </div>
          <div className="cont">
            <h2 className={headerText}>Contact Us</h2>
            <p className={normalText}>
              To contact us please use the following details:
            </p>
            <p className={normalText}>
              House of Nourisha Limited:- 1-75 Shelton Street, Covent Garden,
              London,{" "}
            </p>
            <p className={normalText}>United Kingdom, WC2H 9JQ</p>
            <p className={normalText}>Email: help@eatnourisha.com</p>
          </div>
        </div>
      </div>

      <div className="mx-1.25 md:mx-6.25 mt-8">
        <Footer />
      </div>
    </div>
  );
}
