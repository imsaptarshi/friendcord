import { Box, Flex, Image, Link, ScaleFade, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import CustomButton from "../components/CustomButton.component";
import { signInWithDiscord, signout } from "../utils/auth";
import { motion } from "framer-motion";
import Head from "next/head";
import { meta } from "../utils/meta";

const Home: NextPage = () => {
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
          alignItems="center"
          w="100vw"
          h="100vh"
          justify="center"
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Flex
              direction="column"
              justify="center"
              px={{ base: "6", md: "0" }}
            >
              <Box textAlign="center">
                <Text
                  fontWeight="black"
                  fontSize={{ base: "3xl", md: "5xl" }}
                  lineHeight="10"
                  mt="12"
                >
                  we met on discord
                </Text>
                <Text
                  fontWeight="normal"
                  mx="auto"
                  fontSize={{ base: "sm", md: "xl" }}
                  color="whiteAlpha.700"
                >
                  meet new folks with new niches everyday
                </Text>
              </Box>

              <Box mt="10" mb="20" mx="auto">
                <CustomButton
                  mx="auto"
                  size="xl"
                  onClick={() => {
                    window.location.href =
                      "https://discord.com/api/oauth2/authorize?client_id=961129187131924482&redirect_uri=https%3A%2F%2Ffrencord.herokuapp.com%2Fapi%2Fauth&response_type=code&scope=identify%20guilds";
                  }}
                  _hover={{ transform: "scale(1.05)" }}
                  _focus={{}}
                  _active={{ transform: "scale(0.9)" }}
                  fontSize={{ base: "md", md: "xl" }}
                  leftIcon={
                    <Image
                      w={{ base: "6", md: "7" }}
                      src="/assets/discord_logo.svg"
                      alt="discord"
                    />
                  }
                  py={{ base: "4", md: "5" }}
                  px={{ base: "8", md: "10" }}
                >
                  login with discord
                </CustomButton>
              </Box>
            </Flex>
          </motion.div>
        </Flex>
      </Box>

      <Text
        fontWeight="normal"
        fontSize="sm"
        zIndex={10}
        color="whiteAlpha.500"
        position="absolute"
        bottom={10}
        textAlign="center"
        w="full"
      >
        served by <Link>@sapling</Link> & <Link>@soul</Link> with {"<"}3
      </Text>
    </Box>
  );
};

export default Home;
