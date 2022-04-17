import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Link,
  ScaleFade,
  SlideFade,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import Head from "next/head";
import { meta } from "../../utils/meta";
import { FaArrowRight, FaSignOutAlt } from "react-icons/fa";
import ProfileCard from "../../components/ProfileCards";
import TinderCard from "react-tinder-card";
import { useEffect, useMemo, useRef, useState } from "react";
import discordApi from "../../utils/discord.api";
import React from "react";
import { User } from "../../providers/User.provider";
import { Heart, X } from "react-feather";
import CustomButton from "../../components/CustomButton.component";
import Loading from "../../components/Loading";

const Me: NextPage = () => {
  const [tutorialStep, setTutorialStep] = useState(0);
  const getFeed = async () => {
    const res = await discordApi.get("/api/feed");
    console.log(res);
  };

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isFeedOver, setIsFeedOver] = useState(false);
  useEffect(() => {
    if (tutorialStep > 1) {
      window.localStorage.setItem("friendcord-onboarding", "true");
    }
  }, [tutorialStep]);

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
    <>
      {user ? (
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
          {tutorialStep < 2 &&
            window.localStorage.getItem("friendcord-onboarding") !== "true" && (
              <Box
                position={"absolute"}
                w="100vw"
                backdropFilter="blur(3px)"
                h="100vh"
                zIndex={3}
                bg={{ base: "blackAlpha.700", md: "blackAlpha.700" }}
              >
                <SlideFade
                  offsetY="-100px"
                  offsetX="0px"
                  in={tutorialStep === 0}
                  unmountOnExit={true}
                >
                  <Box>
                    <Image
                      position="absolute"
                      src="/assets/elements/swipe_right.svg"
                      alt="friendcord"
                      w={{ base: "230px", md: "300px" }}
                      bottom={{ base: "52", lg: "60" }}
                      left={{ base: "none", md: "53%" }}
                      right={{ base: "6", md: "none" }}
                    />
                    <Flex
                      position="absolute"
                      direction="column"
                      bottom="10"
                      w="full"
                      justify="center"
                      align="center"
                    >
                      <CustomButton
                        mx="auto"
                        size="xl"
                        py="3"
                        _hover={{ transform: "scale(1.05)" }}
                        _focus={{}}
                        _active={{ transform: "scale(0.9)" }}
                        fontSize="sm"
                        rightIcon={<FaArrowRight />}
                        onClick={() => setTutorialStep(1)}
                      >
                        next
                      </CustomButton>
                      <Button
                        bg="transparent"
                        _hover={{}}
                        _active={{}}
                        _focus={{}}
                        onClick={() => setTutorialStep(2)}
                        textDecoration="underline"
                      >
                        skip
                      </Button>
                    </Flex>
                  </Box>
                </SlideFade>
                <SlideFade
                  offsetY="-100px"
                  offsetX="0px"
                  in={tutorialStep === 1}
                  unmountOnExit={true}
                >
                  <Image
                    position="absolute"
                    src="/assets/elements/swipe_left.svg"
                    alt="friendcord"
                    w={{ base: "230px", md: "300px" }}
                    bottom={{ base: "52", lg: "60" }}
                    left={{ base: "6", md: "26%" }}
                  />
                  <Flex
                    position="absolute"
                    direction="column"
                    bottom="10"
                    w="full"
                    justify="center"
                    align="center"
                  >
                    <CustomButton
                      mx="auto"
                      size="xl"
                      py="3"
                      _hover={{ transform: "scale(1.05)" }}
                      _focus={{}}
                      _active={{ transform: "scale(0.9)" }}
                      fontSize="sm"
                      rightIcon={<FaArrowRight />}
                      onClick={() => setTutorialStep(2)}
                    >
                      finish
                    </CustomButton>
                  </Flex>
                </SlideFade>
              </Box>
            )}
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
                  mt={{ base: "0", md: "0", lg: "0", xl: "0" }}
                  mb={{ base: "10", md: "12", lg: "8", xl: "24" }}
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
                  <Flex
                    experimental_spaceX="2"
                    mt="6"
                    maxW="300px"
                    minW="300px"
                  >
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
                    {isFeedOver && (
                      <motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0, speed: 100000 }}
                      >
                        <Flex
                          px={{ base: "4", md: "0" }}
                          direction="column"
                          mt="40"
                          w="full"
                          justify="center"
                          align="center"
                          textAlign="center"
                        >
                          <Text
                            fontWeight="bold"
                            fontSize={{ base: "xl", md: "2xl" }}
                          >
                            go touch some grass
                          </Text>
                          <Text
                            fontSize={{ base: "xs", md: "sm" }}
                            mt="3"
                            mx={{ md: "-4" }}
                            color="whiteAlpha.700"
                          >
                            try reloading to fetch more profiles - if that{" "}
                            {"doesn't"} work come back after some time
                          </Text>
                        </Flex>
                      </motion.div>
                    )}
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
                        _hover={{
                          transform: "scale(1.05)",
                          bg: "whiteAlpha.500",
                        }}
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
              <Box
                bg="transparent"
                _hover={{ bg: "brand.blurple" }}
                rounded="2xl"
              >
                <Image src="/assets/brand_logo.svg" alt="friendcord" w="40" />
              </Box>
            </Link>
          </Flex>
        </Box>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Me;
