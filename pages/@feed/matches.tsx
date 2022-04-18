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
import { FaBackward, FaSignOutAlt } from "react-icons/fa";
import ProfileCard from "../../components/ProfileCards";
import TinderCard from "react-tinder-card";
import MatchedCard from "../../components/MatchedCard";
import { CornerLeftUp, CornerUpLeft } from "react-feather";
import discordApi from "../../utils/discord.api";
import { useEffect, useState } from "react";

const Me: NextPage = () => {
  const [matches, setMatches] = useState<any>(undefined);
  const getMatches = async () => {
    const res = await discordApi.get("/api/matches", {
      headers: {
        allCookies: String(document.cookie),
      },
    });
    console.log(res.data.data);
    setMatches(res.data.data);
  };

  useEffect(() => {
    getMatches();
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
      <Box position="relative" zIndex={2}>
        <Flex
          direction="column"
          pt="10"
          w="100vw"
          h="100vh"
          align="center"
          overflowY="auto"
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
              mt="6"
            >
              <Link _hover={{}} _active={{}} _focus={{}} href="/">
                <Box
                  bg="transparent"
                  _hover={{ bg: "brand.blurple" }}
                  rounded="2xl"
                >
                  <Image src="/assets/brand_logo.svg" alt="friendcord" w="24" />
                </Box>
              </Link>
              <Box mt="2.5">
                <Text
                  fontWeight="bold"
                  color="whiteAlpha.800"
                  fontSize="sm"
                  letterSpacing={0.5}
                >
                  My Matches <span style={{ fontWeight: "bold" }}>{"<3"}</span>
                </Text>
              </Box>
              <Flex direction="column" mt="10" experimental_spaceY="5">
                <MatchedCard />
                <MatchedCard />
              </Flex>
            </Flex>
          </motion.div>
        </Flex>
        <Flex
          justify="center"
          w="full"
          zIndex={1}
          position="absolute"
          bottom={12}
        >
          <Link _hover={{}} _active={{}} _focus={{}} href="/@feed">
            <Box
              bg="whiteAlpha.800"
              _hover={{ transform: "scale(1.05)", bg: "white" }}
              _focus={{}}
              _active={{ transform: "scale(0.9)" }}
              p="4"
              color="brand.blurple"
              rounded="full"
              transitionDuration="200ms"
            >
              <CornerUpLeft size="30px" />
            </Box>
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default Me;
