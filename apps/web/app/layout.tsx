/*
Root Layout
The root server component defining the HTML structure and injecting providers/fonts.
Belongs in apps/web/app/
*/
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { fontSans } from "@/lib/fonts";
import { AppProviders } from "@/components/providers/AppProviders";
import "./globals.css";

export const metadata: Metadata = {
  title: "CopyCraft AI",
  description: "Enterprise Prompt Engineering Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${fontSans.variable} font-sans antialiased`}>
          <AppProviders>
            {children}
          </AppProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
