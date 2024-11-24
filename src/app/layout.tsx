"use client";
import { Toaster } from "@/components/ui/toaster";
import PagesHOC from "@/HOC/PagesHOC";
import UserContextProvider from "@/HOC/UserContext";
import { Provider as JotaiProvider } from "jotai";
import { Inter } from "next/font/google";
import { Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./globals.css";
import IPInfo from "ip-info-react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";
import Script from "next/script";
import { generateRandomToken } from "@/lib/utils";

const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    if (window && localStorage) {
      setloading(false);
    }
  });

  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="4TELt8M_Nb2PS40WZNWp8fbPlMg0ROxtjoOE3d6Lxpw"
        />
        <Script id="gtm-script">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PFSLQZK3');
          `}
        </Script>

        <Script
          id="cookieyes"
          type="text/javascript"
          src="https://cdn-cookieyes.com/client_data/880430a1c94547acd40ed483/script.js"
        />
      </head>
      <>
        <Suspense fallback={<p>Loading...</p>}>
          <JotaiProvider>
            <QueryClientProvider client={queryClient}>
              <body
                id="app_wrapper"
                className={`${interFont.variable} relative`}
              >
                <noscript>
                  <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-PFSLQZK3"
                    height="0"
                    width="0"
                    className="hidden"
                  ></iframe>
                </noscript>
                <IPInfo>
                  {loading ? (
                    <div className="fixed top-0 right-0 left-0 bottom-0 bg-white flex justify-center items-center z-[9999999999999999]">
                      <div className="animate-pulse">
                        <img
                          src="/images/logo2.svg"
                          className="w-[35rem] md:w-[45rem] h-auto"
                        />
                      </div>
                    </div>
                  ) : (
                    <UserContextProvider>
                      <PagesHOC>
                        {children}
                        <Toaster />
                      </PagesHOC>
                    </UserContextProvider>
                  )}
                </IPInfo>
              </body>
            </QueryClientProvider>
          </JotaiProvider>
        </Suspense>
        <GoogleAnalytics gaId="G-PFSLQZK3" />
      </>
    </html>
  );
}
