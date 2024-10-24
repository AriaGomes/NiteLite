
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NiteLite",
  description: "lightweight ninite alternative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
