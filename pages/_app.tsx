import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { UserProvider } from "../providers/User.provider";
import ContextWrapper from "../components/ContextWrapper.component";
import { NextSeo } from "next-seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="friendcord - we met on discord"
        description="meet new folks with new niches everyday."
        defaultTitle="friendcord - we met on discord"
        canonical="https://friendcord.vercel.app"
        openGraph={{
          url: "https://friendcord.vercel.app",
          title: "friendcord - we met on discord",
          description: "meet new folks with new niches everyday.",
          images: [
            {
              url: "/assets/embed.png",
              width: 1280,
              height: 720,
              alt: "friendcord - we met on discord",
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            property: "keywords",
            content:
              "friendcord, discord, dating, love, friends, e-girl, e-boys",
          },
        ]}
      />
      <UserProvider>
        <ContextWrapper>
          <ChakraProvider theme={theme}>
            <Component {...pageProps} />
          </ChakraProvider>
        </ContextWrapper>
      </UserProvider>
    </>
  );
}

export default MyApp;
