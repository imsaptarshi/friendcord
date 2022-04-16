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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP6s-G2vbGV6-MbmR1eGUbNWiVcAFkwfZKdA&usqp=CAU"
                />
                <Flex direction="column" maxW="180px">
                  <Text fontWeight="bold" fontSize="lg" isTruncated>
                    SoulNinja
                  </Text>
                  <Text
                    isTruncated
                    fontWeight="semibold"
                    color="whiteAlpha.800"
                    fontSize="sm"
                  >
                    SoulNinja#5959
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
              <Flex experimental_spaceX="2" mt="6">
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
                  onClick={() => {
                    window.location.href = "/@feed/matches";
                  }}
                >
                  matches {"<3"}
                </Button>
                <Button
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
              <Flex my="8">
                <TinderCard preventSwipe={["up", "down"]} swipeThreshold={600}>
                  <ProfileCard />
                </TinderCard>
              </Flex>
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
