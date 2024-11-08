import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_APP_NAME!,
    template: `%s - ${process.env.NEXT_PUBLIC_APP_NAME}`,
  },
  icons: [
    {
      rel: "icon",
      type: "image/x-icon",
      url: "/favicon.ico"
    },
    {
      rel: "shortcut icon",
      type: "image/x-icon",
      url: "/favicon.ico"
    }
  ],
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
