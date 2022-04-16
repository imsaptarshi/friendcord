import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { UserProvider } from "../providers/User.provider";
import ContextWrapper from "../components/ContextWrapper.component";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
    </UserProvider>
  );
}

export default MyApp;
