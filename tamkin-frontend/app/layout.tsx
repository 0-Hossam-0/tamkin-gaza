import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import * as React from "react";

import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import QueryProvider from "@/components/QueryProvider";
import { AuthProvider } from "@/components/AuthProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tamkin.org"),
  title: {
    default: "Tamkin - Support Gaza Humanitarian Relief",
    template: "%s | Tamkin",
  },
  description:
    "Tamkin is a humanitarian platform helping raise funds and support for Gaza relief efforts, medical aid, and urgent humanitarian needs.",
  keywords: [
    "Gaza donation",
    "Palestine relief",
    "humanitarian aid",
    "donate Gaza",
    "charity Palestine",
    "Tamkin platform",
  ],
  authors: [
    { name: "Tamkin Team" },
    {
      name: "Abdel Rahman Yasser",
      url: "https://abdoyasser.vercel.app",
    },
  ],
  openGraph: {
    title: "Tamkin - Support Gaza Humanitarian Relief",
    description:
      "Help provide urgent humanitarian aid, food, and medical support to Gaza through Tamkin.",
    url: "https://tamkin.org",
    siteName: "Tamkin",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tamkin - Support Gaza Relief",
    description: "Donate and support urgent humanitarian aid for Gaza.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  const isRTL = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
      className={`${roboto.variable} h-full overflow-x-hidden max-w-screen antialiased ${isRTL ? "rtl" : "ltr"}`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <QueryProvider>
              <Toaster position="top-center" />
              <main className="flex-1">{children}</main>
            </QueryProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
