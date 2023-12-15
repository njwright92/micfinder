import type { Metadata } from "next";
import Head from "next/head";
import Header from "./components/header";
import Footer from "./components/footer";
import { EventProvider } from "./components/eventContext";
import { CityProvider } from "./components/cityContext";
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
    <CityProvider>
      <EventProvider>
        <html lang="en">
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://www.googletagmanager.com/gtag/js?id=G-65JYZXX34C"
            />
            <link
              rel="dns-prefetch"
              href="https://www.googletagmanager.com/gtag/js?id=G-65JYZXX34C"
            />
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <meta name="description" content="Find open mic events near you" />
            <meta
              name="keywords"
              content="Open Mic, Live Performances, Comedians, Poets, Musicians, Events Stand-up Comedy, Comics"
            />
            <title>OpenMicFinder</title>
            <link
              rel="icon"
              href="/favicon.ico"
              type="image/x-icon"
              sizes="16x16"
            />
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "http://schema.org",
                "@type": "Website",
                name: "OpenMicFinder",
                url: "https://micfinder-fb06f.web.app/",
                description:
                  "Discover and share open mic events - your stepping stone in the world of stand-up comedy and live performances.",
              })}
            </script>
          </Head>
          <body>
            <Header />
            {children}
            <Footer />
          </body>
        </html>
      </EventProvider>
    </CityProvider>
  );
}
