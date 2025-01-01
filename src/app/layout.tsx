import type {Metadata} from "next";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "@/app/globals.css";
import React, {Suspense} from "react";

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_APP_NAME!,
    template: `%s - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  },
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: "https://cdn.lumodine.com/public/favicon.ico?v=1",
    },
    {
      rel: "shortcut icon",
      type: "image/x-icon",
      url: "https://cdn.lumodine.com/public/favicon.ico?v=1",
    },
  ],
  robots: "nofollow, noindex",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({children}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en-GB">
      <head>
        <link href="https://cdn.lumodine.com/public/theme.css" rel="stylesheet" />
      </head>
      <body className="theme-yellow">
        <Suspense>
          {children}

          <ToastContainer
            closeOnClick
            draggable
            pauseOnHover
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            pauseOnFocusLoss={false}
            position={"bottom-center"}
            rtl={false}
            theme="colored"
          />
        </Suspense>
      </body>
    </html>
  );
}
