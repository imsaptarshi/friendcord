import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ScaleFade,
  SlideFade,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { motion } from "framer-motion";
import Head from "next/head";
import { meta } from "../../utils/meta";
import {
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaEnvelope,
  FaExternalLinkAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import ProfileCard from "../../components/ProfileCards";
import TinderCard from "react-tinder-card";
import { useEffect, useMemo, useRef, useState } from "react";
import discordApi from "../../utils/discord.api";
import React from "react";
import { User } from "../../providers/User.provider";
import { ExternalLink, Heart, X } from "react-feather";
import CustomButton from "../../components/CustomButton.component";
import Loading from "../../components/Loading";

const Me: NextPage = () => {
  const [tutorialStep, setTutorialStep] = useState(0);
  const [feed, setFeed] = useState<any>(undefined);
  const [copied, setCopied] = useState(false);

  const getFeed = async () => {
    const res = await discordApi.get("/api/feed", {
      headers: {
        allCookies: String(document.cookie),
      },
    });
    console.log("last feed", feed);
    console.log(res.data.data, "AGAIN");
    setFeed(undefined);
    let k: any = [];
    res.data.data.forEach((data: any) => {
      if (data?.interests.length >= 3) {
        k.push(data);
      }
    });
    setFeed(k);
  };

  const [currentIndex, setCurrentIndex] = useState<any>(0);
  const [isFeedOver, setIsFeedOver] = useState(false);
  useEffect(() => {
    if (tutorialStep > 1) {
      window.localStorage.setItem("friendcord-onboarding", "true");
    }
  }, [tutorialStep]);

  useEffect(() => {
    if (currentIndex < 0 || (feed && feed?.length === 0)) {
      setIsFeedOver(true);
    }
  }, [currentIndex, feed]);

  useEffect(() => {
    updateCurrentIndex(feed?.length - 1);
    let l: any = [];
    for (let i = 0; i < feed?.length; i++) {
      l.push(React.createRef());
    }
    setChildRefs(l);
  }, [feed]);
  const canSwipe = currentIndex >= 0;
  const { user } = User();
  const currentIndexRef: any = useRef<any>(currentIndex);

  useEffect(() => {
    getFeed();
  }, []);

  const [childRefs, setChildRefs]: any = useState<any>(undefined);
  const [startedScrolling, setStartedScrolling] = useState(false);

  const swipe = async (dir: any) => {
    if (dir === "right") {
      console.log(feed[currentIndex]?.liked, feed[currentIndex]?.name);
      console.log(feed);
      try {
        if (feed[currentIndex]?.liked?.includes(user?.uid)) {
          onOpen();
        }
      } catch (e) {
        console.log(e);
      }
      await childRefs[currentIndex].current.swipe(dir);
      await discordApi.get("/api/like/" + feed[currentIndex]?.discord, {
        headers: {
          allCookies: String(document.cookie),
        },
      });
    } else if (dir === "left") {
      await childRefs[currentIndex].current.swipe(dir);

      await discordApi.get("/api/dislike/" + feed[currentIndex]?.discord, {
        headers: {
          allCookies: String(document.cookie),
        },
      });
    }

    // Swipe the card!
  };
  const { isOpen, onClose, onOpen } = useDisclosure();
  const updateCurrentIndex = (val: any) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const outOfFrame = async (index: any, dir: any, data: any) => {
    //console.log(`(${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    //currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swiped = async (index: any, dir: any, data: any) => {
    console.log(dir);
    setStartedScrolling(false);
    updateCurrentIndex(index - 1);
    if (dir === "right") {
      document.getElementById("right")?.click();
    } else if (dir === "left") {
      document.getElementById("left")?.click();
    }
  };

  return (
    <>
      {user && feed && childRefs ? (
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
                      bottom={{ base: "20", md: "10" }}
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
                    bottom={{ base: "20", md: "10" }}
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
                  mb={{ base: "24", md: "12", lg: "8", xl: "24" }}
                >
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
                      onClick={() => {
                        window.location.href = "/api/logout";
                      }}
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
                      position="relative"
                      bg="white"
                      fontSize="sm"
                      rounded="full"
                      w="full"
                      onClick={() => {
                        window.location.href = "/@feed/matches";
                      }}
                    >
                      <Box
                        pos="absolute"
                        top="-2"
                        right="0"
                        ring="2px"
                        color="white"
                        ringColor="white"
                        bg="brand.blurple"
                        rounded="full"
                        p="1"
                      >
                        <ExternalLink size="14px" />
                      </Box>
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
                      disabled
                    >
                      filter
                    </Button>
                  </Flex>
                  <Modal
                    isOpen={isOpen}
                    onClose={() => {
                      onClose();
                      setCopied(false);
                    }}
                  >
                    <ModalOverlay />
                    <ModalContent
                      bg="blackAlpha.700"
                      border="4px"
                      borderColor="brand.blurple"
                      backdropFilter="blur(4px)"
                      color="white"
                      rounded="3xl"
                    >
                      <ModalBody>
                        <Flex
                          justify="center"
                          w="full"
                          my="8"
                          direction="column"
                          align="center"
                        >
                          <Text fontSize="2xl" fontWeight="bold">
                            ???? {"it's"} a match
                          </Text>
                          <Flex mt="10">
                            <Avatar
                              ring="4px"
                              ringColor="white"
                              w="70px"
                              h="70px"
                              name={user?.username || "Anonymous"}
                              src={user?.avatar}
                            />
                            <Avatar
                              ring="4px"
                              ringColor="white"
                              w="70px"
                              h="70px"
                              name={
                                feed[currentIndex + 1]?.username || "Anonymous"
                              }
                              src={feed[currentIndex + 1]?.image}
                            />
                          </Flex>
                          <Flex direction="column" mt="10">
                            <CustomButton
                              mx="auto"
                              size="xl"
                              py="3"
                              onClick={async () => {
                                await navigator.clipboard.writeText(
                                  feed[currentIndex + 1]?.username
                                );
                                setCopied(true);
                              }}
                              _hover={{ transform: "scale(1.05)" }}
                              _focus={{}}
                              _active={{ transform: "scale(0.9)" }}
                              fontSize="lg"
                              leftIcon={<FaEnvelope />}
                            >
                              {copied ? "copied username" : "send friendreq"}
                            </CustomButton>
                            <CustomButton
                              mx="auto"
                              mt="2"
                              size="xl"
                              py="3"
                              onClick={() => {
                                onClose();
                                setCopied(false);
                              }}
                              _hover={{ transform: "scale(1.05)" }}
                              _focus={{}}
                              _active={{ transform: "scale(0.9)" }}
                              fontSize="lg"
                              bg="transparent"
                              color="white"
                            >
                              continue swiping
                            </CustomButton>
                          </Flex>
                        </Flex>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                  <Box
                    my="6"
                    position="relative"
                    minH="450px"
                    mx="auto"
                    maxW="300px"
                    minW="300px"
                  >
                    {
                      <>
                        {!isFeedOver && (
                          <>
                            {startedScrolling && (
                              <Box
                                display={{ base: "block", lg: "none" }}
                                position="absolute"
                                rounded="full"
                                zIndex={10}
                                bg="whiteAlpha.200"
                                p="2"
                                _hover={{ bg: "whiteAlpha.300" }}
                                right="3"
                                top="47%"
                                onClick={() => {
                                  const el: any = document.getElementById(
                                    "interests" + currentIndex
                                  );
                                  el.scrollTop -= 50;
                                }}
                              >
                                <FaChevronUp size="10px" />
                              </Box>
                            )}
                            <Box
                              display={{ base: "block", lg: "none" }}
                              position="absolute"
                              rounded="full"
                              bg="whiteAlpha.200"
                              p="2"
                              bottom="23%"
                              zIndex={10}
                              _hover={{ bg: "whiteAlpha.300" }}
                              onClick={() => {
                                if (!startedScrolling) {
                                  setStartedScrolling(true);
                                }
                                const el: any = document.getElementById(
                                  "interests" + currentIndex
                                );
                                el.scrollTop += 50;
                              }}
                              right="3"
                            >
                              <FaChevronDown size="10px" />
                            </Box>
                          </>
                        )}
                      </>
                    }
                    {childRefs &&
                      feed.map((data: any, key: any) => (
                        <TinderCard
                          key={key}
                          className="swipe"
                          ref={childRefs[key]}
                          onCardLeftScreen={(dir) => outOfFrame(key, dir, data)}
                          onSwipe={(dir) => swiped(key, dir, data)}
                          preventSwipe={["up", "down"]}
                        >
                          <ProfileCard
                            data={data}
                            currentIndex={currentIndex}
                            swipe={swipe}
                            idx={key}
                          />
                        </TinderCard>
                      ))}
                    {feed && isFeedOver && (
                      <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{
                          y: 0,
                          opacity: 1,
                        }}
                        transition={{ delay: 0.3, duration: 0.3 }}
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
                        id="left"
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
                        id="right"
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
