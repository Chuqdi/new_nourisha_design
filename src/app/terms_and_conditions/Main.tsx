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
          Terms & Conditions
        </h3>
      </div>

      {/* <div className="mx-1.25 md:mx-6.25 my-20 flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h4 className={headerText}>Terms & Conditions</h4>
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
              All updates and upgrades to the App will be governed by the
              version of these Terms published by Company as of the date you
              install such update or upgrade. You agree, however, that we are
              not obligated to create or provide any support, corrections,
              updates, upgrades, bug fixes and/or enhancements of the App or for
              the Service. Any rights not expressly granted herein are reserved.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className={headerText}>Reservation of Rights</h4>
          <p className={normalText}>
            We reserve the right to request that you remove all links or any
            particular link to our Website. You approve to immediately remove
            all links to our Website upon request. We also reserve the right to
            amen these terms and conditions and it’s linking policy at any time.
            By continuously linking to our Website, you agree to be bound to and
            follow these linking terms and conditions.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className={headerText}>Removal of link from our Websites</h4>
          <p className={normalText}>
            If you find any link on our Website that is offensive for any
            reason, you are free to contact and inform us any moment. We will
            consider requests to remove links but we are not obligated to or so
            or to respond to you directly.
            <br />
            We do not ensure that the information on this website is correct, we
            do not warrant its completeness or accuracy; nor do we promise to
            ensure that the website remains available or that the material on
            the website is kept up to date.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className={headerText}>Feedback</h4>
          <p className={normalText}>
            If you provide Company with any feedback or suggestions regarding
            the App, Tasks or Services (“Feedback”), you hereby assign to
            Company all rights in the Feedback and agree that Company shall have
            the right to use such Feedback and related information in any manner
            it deems appropriate without any right to any compensation. Company
            will treat any Feedback you provide to Company as non-confidential
            and non-proprietary. You agree that you will not submit to Company
            any information or ideas that you consider to be confidential or
            proprietary.
          </p>
        </div>
      </div> */}

      <div className="mx-1.25 md:mx-6.25 my-20 ">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className={headerText}>1. Definitions</h1>
            <h2 className={headerText}>Content</h2>
            <p className={normalText}>The information and materials appearing on the Site</p>
            <h2 className={headerText}>Terms</h2>
            <p className={normalText}>
              The conditions set out in this document including Our Privacy
              Policy
            </p>
            <h2 className={headerText}>Site</h2>
            <p className={normalText}>https://eatnourisha.com/</p>
            <h2 className={headerText}>We/Us/Our</h2>
            <p className={normalText}>
              House of Nourisha Ltd whose registered office is at 71-75 Shelton
              Street, Covent Garden, London, United Kingdom, WC2H 9JQ
            </p>
            <h2 className={headerText}>You/Your</h2>
            <p className={normalText}>The person company or party who uses Our Site</p>
          </div>
          <div className="general">
            <h1 className={headerText}>2. General</h1>
            <ul className="flex flex-col gap-3">
              <li>
                2.1 Use by You of the Site constitutes acceptance by You of the
                following terms of use. Your use of the Site will be governed by
                these Terms
              </li>
              <li>
                2.2 These Terms constitute the entire agreement between You and
                Us and govern Your use of the Site superseding any prior
                agreements between You and Us
              </li>
              <li>
                2.3 You agree that no joint venture partnership employment or
                agency relationship exists between You and Us as a result of
                Your use of the Site and therefore acceptance of these Terms
              </li>
              <li>
                2.4 We may collect information on what pages are accessed or
                visited by You and information volunteered by You such as Your
                contact details and/or any site registrations. We may use this
                information for internal review and in order to improve the
                Content of the Site
              </li>
              <li>
                2.5 Where We collect information from You via Your access and
                use of the Site and You voluntarily submit to Us such
                information whilst using the Site Our use of Your information
                will be governed by these Terms in accordance with our Privacy
                Statement. Please read these Terms and our privacy statement
                carefully before using the Site
              </li>
              <li>
                2.6 If You do not agree to all of these Terms You may not use
                the Site which is owned and operated by Us
              </li>
              <li>
                2.7 If You have any comments suggestions or questions about
                these Terms and/or the Site and/or Us generally You can contact
                Us by sending an e-mail to help@eatnourisha.com or by writing to
                House of Nourisha Ltd at the address above.
              </li>
            </ul>
          </div>
          <div className="copyright">
            <h1 className={headerText}>3. Copyright and trademarks</h1>
            <ul className="flex flex-col gap-3">
              <li>
                3.1 The Content appearing on the Site is displayed for personal
                non-commercial use only
              </li>
              <li>
                3.2 All software used on the Site and all Content included on
                the Site (including without limitation site design text graphics
                audio and video the selection and arrangement thereof and the
                underlying source code) is Our property or that of Our suppliers
                and is protected by international copyright laws
              </li>
              <li>
                3.3 All trademarks service marks and logos used on the Site from
                time to time are the trademarks service marks or logos of their
                respective owners
              </li>
              <li>
                3.4 None of the Content may be downloaded copied reproduced
                republished posted transmitted stored sold or distributed
                without the prior written permission of the copyright holder.
                This excludes the downloading of one copy of extracts from the
                Site on any single computer for personal non-commercial home use
                only provided that all copyright and proprietary notices are
                kept intact
              </li>
              <li>
                3.5 Modification of any of the Content or use of any of the
                Content for any purpose other than as set out herein including
                without limitation on any other website or computer network is
                prohibited
              </li>
              <li>
                3.6 If You breach any of the Terms of this legal notice Your
                permission to use the Site automatically terminates and You must
                immediately destroy any downloaded or printed extracts from the
                Site
              </li>
              <li>
                3.7 Requests to republish any of the Content and to use
                quotations or extracts from the Site should be addressed to
                help@eatnourisha.com
              </li>
              <li>
                3.8 We have made every effort to secure where appropriate
                licenses and clearances for all third party intellectual
                property used on the Site. You may notify Us of alleged
                intellectual property rights infringement by contacting us via
                e-mail at help@eatnourisha.com
              </li>
            </ul>
          </div>
          <div className="links">
            <h1 className={headerText}>Links to third party websites</h1>
            <ul className="flex flex-col gap-3">
              <li>
                4.1 The Site may from time to time include links to third party
                internet websites which are controlled and maintained by others.
                These links are included solely for Your convenience and do not
                constitute any endorsement by Us of the websites linked or
                referred to nor do We have any control over the content of any
                such websites
              </li>
              <li>
                4.2 We have not reviewed all of these third party websites and
                do not make any representations regarding the availability or
                content or accuracy of materials on such websites. If You decide
                to access third party websites through links on the Site You do
                so at your own risk. Your use of third party websites is subject
                to the terms and conditions of use of those websites
              </li>
            </ul>
          </div>
          <div className="liability">
            <h1 className={headerText}>5. Liability disclaimer</h1>
            <ul className="flex flex-col gap-3">
              <li>
                5.1 While we endeavour to ensure that the information on the
                Site is correct to the maximum extent permitted by law We
                provide You with the Site on an ‘as is’ basis only
              </li>
              <li>
                5.2 You accept that access to the Site may be suspended at any
                time and without notice in the case of systems failure
                maintenance or repair or for any other reasons whatsoever
                including for reasons beyond Our control
              </li>
              <li>
                5.3 We make no representation or warranties of any kind express
                or implied as to the operation of the Site or the information
                reliability completeness or timeliness of the Content or
                services available on the Site or that the use of the Site will
                be uninterrupted timely secure or error-free
              </li>
              <li>
                5.4 You expressly agree that Your use of the Site is at Your own
                risk
              </li>
              <li>
                5.5 Any other party whether or not involved in creating
                producing maintaining or delivering the Site including the
                officers employees consultants or agents exclude all liability
                and responsibility for any amount or kind of loss or damage that
                may result to You or any third party including without
                limitation any direct indirect punitive or consequential loss or
                damages or any loss of income profits goodwill data contracts
                use of money or loss or damages arising from or connected in any
                way to business interpretation and whether in tort including
                without negligence contract warranty or otherwise in connection
                with the Site in any way or in connection with the use inability
                to use or the results of use of the Site any websites linked to
                the Site or the Content on the Site including but not limited to
                loss or damage due to viruses including logic bombs trojan
                horses worms harmful components corrupted data or other
                malicious software or harmful data that may infect Your computer
                equipment software data or other property on account of Your
                access to use of or browsing the Site or Your downloading of any
                content from the Site or any websites linked to the Site
              </li>
              <li>
                5.6 We exclude all liability and responsibility as set out above
                whether or not We are advised of the possibility of such loss or
                damage
              </li>
              <li>
                5.7 Nothing in these Terms shall exclude or limit Our or Our
                employees’ or agents’ liability for:-
              </li>
              <li>
                (a) death personal injury or fraud caused by Our negligence or
              </li>
              <li>(b) misrepresentation as to a fundamental matter or</li>
              <li>
                (c) any liability which cannot be excluded or limited under
                applicable law including conditions and warranties as to title
                to goods implied by sale of goods legislation and where the
                customer deals as a consumer or conditions as to goods’
                description fitness and quality and implied by sale of goods
                legislation and conditions as to supply of goods and services
                legislation
              </li>
              <li>
                5.8 If Your use of the content on the Site results in the need
                for servicing repairing or correction of equipment software or
                data You assume all costs thereof
              </li>
              <li>
                5.9 If You are a consumer this legal notice does not affect the
                legal rights which You have under law which cannot be excluded
                or limited. If You want to know what these rights are You should
                contact Your local Citizens Advice Bureau
              </li>
            </ul>
          </div>
          <div className="your">
            <h1 className={headerText}>6. Your account</h1>
            <ul className="flex flex-col gap-3">
              <li>
                6.1 If from time to time We offer and You have an account with
                Us then You are responsible for maintaining the confidentiality
                of this account and any related passwords for Your restricting
                access to Your computer and/or account. You agree to accept
                responsibility for all activities that take place under Your
                account and/or passwords
              </li>
              <li>
                6.2 Other than personal data or sensitive personal data about
                You which is covered under the terms of our Privacy Policy any
                material You transmit or post to the Site shall be considered
                non-confidential and non-proprietary. We shall have no
                obligations with respect to such material
              </li>
              <li>
                6.3 We and designated third parties shall be free to copy
                disclose distribute incorporate and otherwise use such material
                and all data images sounds text and other things embodied
                therein for any and all commercial or non-commercial purposes
              </li>
              <li>
                6.4 In accordance with and without prejudice to our Acceptable
                Use Policy You are prohibited from posting or transmitting to or
                from the Site any material:
              </li>
              <li>
                (a) that is threatening defamatory obscene indecent seditious
                offensive pornographic abusive liable to incite racial hatred
                discriminatory menacing scandalous inflammatory blasphemous in
                breach of confidence in breach of privacy or which may cause
                annoyance or inconvenience or
              </li>
              <li>
                (b) for which You have not obtained all necessary licences
                and/or approvals or
              </li>
              <li>
                (c) which constitutes or encourages conduct that would be
                considered a criminal offence give rise to civil liability or
                otherwise be contrary to the law of or infringe the rights of
                any third party in the United Kingdom or any other country in
                the world or
              </li>
              <li>
                (d) which is technically harmful including without limitation
                computer viruses logic bombs Trojan horses worms harmful
                components corrupted data or other malicious software or harmful
                data or
              </li>
              <li>
                (e) which facilitates Your misuse of the Site including without
                limitation hacking
              </li>
              <li>
                6.5 We shall fully co-operate with any law enforcement
                authorities or court order requesting or directing us to
                disclose the identity or locate anyone posting any material in
                breach of the above prohibitions
              </li>
            </ul>
          </div>
          <div className="termination">
            <h1 className={headerText}>7. Termination</h1>
            <p className={normalText}>
              You agree that We may in Our sole discretion and at any time
              terminate any password and account or any part thereof of Yours
              without limitation if We reasonably believe that You have violated
              or acted inconsistently with the letter or spirit of these Terms
            </p>
          </div>
          <div className="advert">
            <h1 className={headerText}>8. Advertisements</h1>
            <ul className="flex flex-col gap-3">
              <li>
                8.1 The Site may contain advertisements by third parties and
                these advertisements may contain links to other websites
              </li>
              <li>
                8.2 Unless otherwise specifically stated We do not endorse any
                product or service or make any representation regarding the
                Content or accuracy of any materials contained in or linked to
                any advertisement on the Site
              </li>
            </ul>
          </div>
          <div className="competitions">
            <h1 className={headerText}>9. Competitions and Prizedraws</h1>
            <p className={normalText}>
              These terms apply to any competition, prizedraw or raffle that may
              be promoted by Skill Learn Group Ltd through the website or
              associated social media platforms.
            </p>
          </div>
          <div className="indemnity">
            <h1 className={headerText}>10. Indemnity</h1>
            <ul className="flex flex-col gap-3">
              <li>
                10.1 You agree to indemnify and hold Us Our officers employees
                agents consultants licensees and suppliers harmless from and
                against any claims actions or demands liabilities and
                settlements including without limitation reasonable legal and
                accounting fees resulting from or alleged to result from Your
                use of the Content of the Site in a manner that violates or is
                alleged to violate these Terms
              </li>
              <li>
                10.2 We shall provide notice to You promptly of any such claim
                suit or proceeding and shall reasonably co-operate with You at
                Your expense in Your defence of any such claim
              </li>
            </ul>
          </div>
          <div className="force">
            <h1 className={headerText}>11. Force Majeure</h1>
            <p className={normalText}>
              We will not be liable for any delay or failure in performance or
              interruption of the delivery of the Content of the Site resulting
              directly or indirectly from any cause or circumstances beyond Our
              reasonable control including but not limited to failure of
              equipment or communication lines telephone or other interconnect
              problems computer viruses including logic bombs Trojan horses
              worms harmful components corrupted data or other malicious
              software or harmful data unauthorised access theft operator errors
              severe weather earthquakes or natural disasters strikes or other
              labour problems wars or governmental restrictions
            </p>
          </div>
          <div className="severe">
            <h1 className={headerText}>12. Severability and waiver</h1>
            <p className={normalText}>
              If any provision of these Terms is found to be invalid by any
              court having competent jurisdiction the invalidity of such
              provision shall not affect the validity of the remaining
              provisions of these Terms which shall remain in full force and
              effect. No waiver of any of these terms shall be deemed a further
              or continuing waiver of such term or any other term
            </p>
          </div>
          <div className="access">
            <h1 className={headerText}>13. Access outside England</h1>
            <ul className="flex flex-col gap-3">
              <li>
                13.1 We are based in England. Access to the Content of the Site
                may not be legal by certain persons or in certain countries
              </li>
              <li>
                13.2 If You access the Site from outside England You do so at
                Your own risk and are responsible for compliance with the Laws
                of Your jurisdiction
              </li>
              <li>
                13.3 Recognising the global nature of the internet You agree to
                comply with all local rules regarding on line conduct and
                acceptable content and You agree to comply with all applicable
                laws regarding the transmission of technical data exported from
                the country in which You reside
              </li>
            </ul>
          </div>
          <div className="juris">
            <h1 className={headerText}>14. Jurisdiction</h1>
            <p className={normalText}>
              These Terms are governed by and construed in accordance with
              English Law unless You live in Scotland in which case these Terms
              will be governed by Scots Law and You and We irrevocably agree
              that the UK Courts shall have non-exclusive jurisdiction to settle
              any dispute which may arise out of or in connection with these
              Terms or the legal relationship established by them and for those
              purposes irrevocably submit all disputes to the non-exclusive
              jurisdiction of the UK Courts
            </p>
          </div>
          <div className="notification">
            <h1 className={headerText}>Notification of changes to these terms</h1>
            <ul className="flex flex-col gap-3">
              <li>
                15.1 We reserve the right at Our sole discretion to add to or
                change these Terms
              </li>
              <li>
                15.2 If We publish any changes We will let You know by posting
                such changes to this page and/or by posting notification of the
                change to our Site homepage or by sending You an email
              </li>
              <li>
                15.3 Once We have posted any such changes it is then Your
                responsibility as a user to ensure that You are aware of such
                changes from time to time
              </li>
              <li>
                15.4 Changes will become effective 24 hours after first posting
                and You will be deemed to have accepted any change if You
                continue to access the Site after that time
              </li>
            </ul>
          </div>
          <div className="copies">
            <p className={normalText}>&copy; 2023 House of Nourisha Ltd</p>
            <p className={normalText}>All rights reserved.</p>
          </div>
        </div>
      </div>

      <div className="mx-1.25 md:mx-6.25 mt-8">
        <Footer />
      </div>
    </div>
  );
}
