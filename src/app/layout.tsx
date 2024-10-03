"use client";
import { Toaster } from "@/components/ui/toaster";
import PagesHOC from "@/HOC/PagesHOC";
import UserContextProvider from "@/HOC/UserContext";
import { Provider as JotaiProvider } from "jotai";
import { Inter } from "next/font/google";
import { Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./globals.css";

const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--inter",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

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
      <Suspense fallback={<p>Loading...</p>}>
        <JotaiProvider>
          <QueryClientProvider client={queryClient}>
            <body id="app_wrapper" className={`${interFont.variable} relative`}>
              {loading ? (
                <div className="fixed top-0 right-0 left-0 bottom-0 bg-white flex justify-center items-center z-[9999999999999999]">
                  <div className="animate-pulse">
                    <img src="/images/logo2.png" />
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
            </body>
          </QueryClientProvider>
        </JotaiProvider>
      </Suspense>
    </html>
  );
}
