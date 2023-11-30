import type { Metadata } from "next";
import Header from "./components/header";
import Footer from "./components/footer";
import { EventProvider } from "./components/eventContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenMicFinder",
  description: "Find open mic events near you",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EventProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </EventProvider>
  );
}
