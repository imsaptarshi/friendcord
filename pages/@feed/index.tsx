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
import { useEffect, useMemo, useRef, useState } from "react";
import discordApi from "../../utils/discord.api";
import React from "react";
import { User } from "../../providers/User.provider";
import { Heart, X } from "react-feather";

const Me: NextPage = () => {
  const getFeed = async () => {
    const res = await discordApi.get("/api/feed");
    console.log(res);
  };

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isFeedOver, setIsFeedOver] = useState(false);
  useEffect(() => {
    if (currentIndex < 0) {
      setIsFeedOver(true);
    }
  }, [currentIndex]);
  const canSwipe = currentIndex >= 0;
  const { user } = User();
  const currentIndexRef: any = useRef<any>(currentIndex);
  useEffect(() => {
    getFeed();
  }, []);

  const childRefs: any = useMemo(
    () =>
      Array(2)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const swipe = async (dir: any) => {
    await childRefs[currentIndex].current.swipe(dir);

    // Swipe the card!
  };

  const updateCurrentIndex = (val: any) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const outOfFrame = (idx: any) => {
    console.log(`(${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swiped = (index: any) => {
    updateCurrentIndex(index - 1);
  };

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
              mb={{ base: "40", lg: "20", xl: "32" }}
              mt="10"
            >
              {/*profile display*/}
              <Flex align="center" experimental_spaceX="4">
                <Avatar
                  name="Sap"
                  w="44px"
                  h="44px"
                  _hover={{ ring: "4px" }}
                  transitionDuration="200ms"
                  cursor="pointer"
                  ring="3px"
                  ringColor="white"
                  src={user?.avatar}
                />
                <Flex direction="column" maxW="160px" minW="160px">
                  <Text fontWeight="bold" fontSize="lg" isTruncated>
                    {user?.username}
                  </Text>
                  <Text
                    isTruncated
                    fontWeight="semibold"
                    color="whiteAlpha.800"
                    fontSize="sm"
                  >
                    {user?.name}
                  </Text>
                </Flex>
                <Box
                  p="2"
                  rounded="xl"
                  _hover={{ bg: "whiteAlpha.300" }}
                  transitionDuration="200ms"
                  cursor="pointer"
                >
                  <FaSignOutAlt size="20px" />
                </Box>
              </Flex>
              <Flex experimental_spaceX="2" mt="6" maxW="300px" minW="300px">
                <Button
                  _hover={{}}
                  _active={{}}
                  _focus={{}}
                  fontWeight="bold"
                  color="brand.blurple"
                  py="4"
                  px="8"
                  bg="white"
                  fontSize="sm"
                  rounded="full"
                  w="full"
                  onClick={() => {
                    window.location.href = "/@feed/matches";
                  }}
                >
                  matches {"<3"}
                </Button>
                <Button
                  w="full"
                  _hover={{ bg: "whiteAlpha.500" }}
                  _active={{}}
                  _focus={{}}
                  fontWeight="bold"
                  color="white"
                  py="4"
                  px="8"
                  bg="whiteAlpha.400"
                  fontSize="sm"
                  rounded="full"
                >
                  filter
                </Button>
              </Flex>
              <Box
                my="8"
                position="relative"
                minH="450px"
                mx="auto"
                maxW="300px"
                minW="300px"
              >
                {[0, 1].map((data, key) => (
                  <TinderCard
                    key={key}
                    className="swipe"
                    ref={childRefs[key]}
                    onCardLeftScreen={() => outOfFrame(key)}
                    onSwipe={() => swiped(key)}
                    preventSwipe={["up", "down"]}
                  >
                    <ProfileCard swipe={swipe} index={key} />
                  </TinderCard>
                ))}

                <Flex
                  experimental_spaceX={6}
                  justify="center"
                  opacity={isFeedOver ? "0" : "1"}
                  position="absolute"
                  zIndex="2"
                  bottom={{ base: "2", lg: "4" }}
                  w="full"
                >
                  <Box
                    cursor="pointer"
                    transitionDuration="200ms"
                    onClick={() => swipe("left")}
                    _hover={{ transform: "scale(1.05)", bg: "whiteAlpha.500" }}
                    _focus={{}}
                    _active={{ transform: "scale(0.9)" }}
                    p="4"
                    rounded="full"
                    bg="whiteAlpha.400"
                    color="white"
                  >
                    <X strokeWidth="3px" />
                  </Box>
                  <Box
                    cursor="pointer"
                    onClick={() => swipe("right")}
                    transitionDuration="200ms"
                    p="4"
                    _hover={{ transform: "scale(1.05)" }}
                    _focus={{}}
                    _active={{ transform: "scale(0.9)" }}
                    rounded="full"
                    bg="brand.blurple"
                    color="white"
                  >
                    <Heart fill="white" />
                  </Box>
                </Flex>
              </Box>
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
