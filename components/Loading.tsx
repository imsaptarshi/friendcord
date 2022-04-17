import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Link,
  ScaleFade,
  Spinner,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import Head from "next/head";

import { FaBackward, FaSignOutAlt } from "react-icons/fa";

import TinderCard from "react-tinder-card";
import { CornerLeftUp, CornerUpLeft } from "react-feather";

const Loading = () => {
  return (
    <Box
      overflow="hidden"
      w="100vw"
      h="100vh"
      bg="brand.black"
      color="white"
      position="relative"
    >
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
          alignItems="center"
          justify="center"
          w="100vw"
          h="100vh"
          align="center"
          overflowY="auto"
        >
          <Spinner />
        </Flex>
      </Box>
    </Box>
  );
};

export default Loading;
