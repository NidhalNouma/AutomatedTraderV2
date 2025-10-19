import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { WhopIframeSdkProvider } from "@whop/react";
import { cookies } from "next/headers";

import { AuthProvider, WhopProvider, AccountProvider } from "@/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutomatedTrader - Professional Trading Automation Platform",
  description:
    "Connect any broker, automate any strategy. Turn your TradingView alerts into profitable trades 24/7.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("whop_access_token")?.value;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <WhopIframeSdkProvider>
          <WhopProvider accessToken={accessToken}>
            <AccountProvider>
              <AuthProvider>
                <div className="min-h-screen ibg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
                  {children}
                </div>
              </AuthProvider>
            </AccountProvider>
          </WhopProvider>
        </WhopIframeSdkProvider>
      </body>
    </html>
  );
}
