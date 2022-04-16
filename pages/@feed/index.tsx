import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Link,
  ScaleFade,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import Head from "next/head";
import { meta } from "../../utils/meta";
import { FaSignOutAlt } from "react-icons/fa";
import ProfileCard from "../../components/ProfileCards";
import TinderCard from "react-tinder-card";
import { useEffect } from "react";
import discordApi from "../../utils/discord.api";

const Me: NextPage = () => {
  const getFeed = async () => {
    const res = await discordApi.get("/api/feed");
    console.log(res);
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <Box
      overflow="hidden"
      w="100vw"
      h="100vh"
      bg="brand.black"
      color="white"
      position="relative"
    >
      <Head>
        <title>{meta.title}</title>
      </Head>
      <Image
        display={{ base: "none", lg: "block" }}
        src="/assets/background_gradient.png"
        alt="friendcord"
        position="absolute"
        zIndex={0}
        left={0}
        top={0}
        w="100vw"
        h="100vh"
      />
      <Image
        display={{ base: "none", md: "block", lg: "none" }}
        src="/assets/background_gradient_tablet.png"
        alt="friendcord"
        position="absolute"
        zIndex={0}
        left={0}
        top={0}
        w="100vw"
        h="100vh"
      />
      <Image
        display={{ base: "block", md: "none" }}
        src="/assets/background_gradient_mobile.png"
        alt="friendcord"
        position="absolute"
        zIndex={0}
        left={0}
        top={0}
        w="100vw"
        h="100vh"
      />
      <Box position="relative" zIndex={2} overflowY="auto">
        <Flex
          direction="column"
          pt="10"
          w="100vw"
          h="100vh"
          align="center"
          justify="center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Flex
              direction="column"
              align="center"
              px={{ base: "6", md: "0" }}
              mb={{ base: "20", xl: "32" }}
              mt="10"
            >
              {/*profile display*/}
              just few more hours until we go live
            </Flex>
          </motion.div>
        </Flex>
      </Box>

      <Flex
        justify="center"
        w="full"
        zIndex={1}
        position="absolute"
        bottom={10}
      >
        <Link _hover={{}} _active={{}} _focus={{}} href="/">
          <Box bg="transparent" _hover={{ bg: "brand.blurple" }} rounded="2xl">
            <Image src="/assets/brand_logo.svg" alt="friendcord" w="40" />
          </Box>
        </Link>
      </Flex>
    </Box>
  );
};

export default Me;
