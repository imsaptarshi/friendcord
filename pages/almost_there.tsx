import {
  AspectRatio,
  Box,
  Flex,
  Image,
  Link,
  ScaleFade,
  SlideFade,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import CustomButton from "../components/CustomButton.component";
import { signInWithDiscord } from "../utils/auth";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { User } from "../providers/User.provider";
import { meta } from "../utils/meta";
import { FaArrowRight } from "react-icons/fa";
import { Error } from "../utils/errors";
import Head from "next/head";

const UserForm: NextPage = () => {
  const { user } = User();
  const [preferences, setPreferences] = useState<Array<String>>([]);
  const [pronoun, setPronoun] = useState<String | undefined>(undefined);
  const [step, setStep] = useState<Number>(0);
  const [error, setError] = useState<any>(undefined);

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
          px={{ base: "6", md: "none" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SlideFade
              offsetY="-100px"
              offsetX="0px"
              in={step === 0}
              unmountOnExit={true}
            >
              <Flex direction="column" justify="center">
                <Box textAlign="center">
                  <Text fontWeight="black" fontSize={{ base: "xl", md: "2xl" }}>
                    hey {user?.username || "Anonymous"}!
                  </Text>
                  <Text
                    fontWeight="normal"
                    fontSize="xs"
                    color="whiteAlpha.700"
                  >
                    let{"'"}s know more about you!
                  </Text>
                </Box>

                <Box textAlign="center">
                  <Text
                    fontWeight="black"
                    fontSize={{ base: "2xl", md: "3xl" }}
                    mt="12"
                  >
                    pick ur preferences
                  </Text>
                </Box>

                <Flex
                  wrap="wrap"
                  maxH="220px"
                  overflow="auto"
                  maxW="600px"
                  justify="center"
                  mt="6"
                  py="2"
                  mr="-4"
                >
                  {meta.preferences.map((data, key) => (
                    <Flex
                      className="not-selectable"
                      cursor="pointer"
                      onClick={() => {
                        if (preferences.includes(data.topic)) {
                          let _preferences: Array<String> = [];
                          preferences.forEach((_data) => {
                            if (_data !== data.topic) {
                              _preferences.push(_data);
                            }
                          });
                          setPreferences(_preferences);
                        } else {
                          let _preferences = preferences.slice(0);
                          _preferences.push(data.topic);
                          setPreferences(_preferences);
                        }
                      }}
                      _hover={{
                        bg:
                          !preferences.includes(data.topic) && "whiteAlpha.400",
                      }}
                      align="center"
                      key={key}
                      mr="4"
                      mb="5"
                      rounded="full"
                      p="2"
                      pr="5"
                      transitionDuration="200ms"
                      ring="3px"
                      ringColor={
                        preferences.includes(data.topic)
                          ? "white"
                          : "transparent"
                      }
                      bg={
                        preferences.includes(data.topic)
                          ? "whiteAlpha.500"
                          : "whiteAlpha.300"
                      }
                    >
                      <AspectRatio ratio={1} w={{ base: "7", md: "8" }} mr="2">
                        <Image src={data.graphic} rounded="full" w="full" />
                      </AspectRatio>
                      <Text
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="semibold"
                      >
                        {data.topic}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
                <Box mt="10" mb="2" mx="auto">
                  <CustomButton
                    mx="auto"
                    size="xl"
                    py="3"
                    onClick={() => {
                      if (preferences.length < 3) {
                        setError(Error.NOT_ENOUGH_DATA);
                      } else {
                        setStep(1);
                        setError(undefined);
                      }
                    }}
                    _hover={{ transform: "scale(1.05)" }}
                    _focus={{}}
                    _active={{ transform: "scale(0.9)" }}
                    fontSize="lg"
                    rightIcon={<FaArrowRight />}
                  >
                    next
                  </CustomButton>
                </Box>
                <Box textAlign="center" mb="16">
                  {error === Error.NOT_ENOUGH_DATA && (
                    <ScaleFade initialScale={0} in={true}>
                      <Text fontSize="xs" color="white">
                        choose atleast 3 of them
                      </Text>
                    </ScaleFade>
                  )}
                </Box>
              </Flex>
            </SlideFade>

            <SlideFade
              offsetY="-100px"
              offsetX="0px"
              in={step === 1}
              delay={0.7}
              unmountOnExit={true}
            >
              <Flex direction="column" justify="center">
                <Box textAlign="center">
                  <Text fontWeight="black" fontSize={{ base: "xl", md: "2xl" }}>
                    awsm {user?.username || "Anonymous"}!
                  </Text>
                  <Text
                    fontWeight="normal"
                    fontSize="xs"
                    color="whiteAlpha.700"
                  >
                    almost there
                  </Text>
                </Box>

                <Box textAlign="center">
                  <Text
                    fontWeight="black"
                    fontSize={{ base: "2xl", md: "3xl" }}
                    mt="12"
                  >
                    your pronouns
                  </Text>
                </Box>

                <Flex wrap="wrap" maxW="400px" justify="center" mt="6" mr="-4">
                  {meta.pronouns.map((data, key) => (
                    <Flex
                      className="not-selectable"
                      cursor="pointer"
                      onClick={() => {
                        setPronoun(data);
                      }}
                      _hover={{
                        bg: pronoun !== data && "whiteAlpha.400",
                      }}
                      align="center"
                      key={key}
                      mr="4"
                      mb="5"
                      rounded="full"
                      p="2"
                      px="4"
                      transitionDuration="200ms"
                      ring="3px"
                      ringColor={pronoun === data ? "white" : "transparent"}
                      bg={
                        pronoun === data ? "whiteAlpha.500" : "whiteAlpha.300"
                      }
                    >
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        fontWeight="semibold"
                      >
                        {data}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
                <Box mt="10" mb="2" mx="auto">
                  <CustomButton
                    mx="auto"
                    size="xl"
                    py="3"
                    onClick={() => {
                      if (!pronoun) {
                        setError(Error.NOT_ENOUGH_DATA);
                      } else {
                        //onboard user
                        window.location.href = "/@feed";
                      }
                    }}
                    _hover={{ transform: "scale(1.05)" }}
                    _focus={{}}
                    _active={{ transform: "scale(0.9)" }}
                    fontSize="lg"
                    rightIcon={<FaArrowRight />}
                  >
                    lesgo
                  </CustomButton>
                </Box>
                <Box textAlign="center" mb="16">
                  {error === Error.NOT_ENOUGH_DATA && (
                    <ScaleFade initialScale={0} in={true}>
                      <Text fontSize="xs" color="white">
                        choose one of em
                      </Text>
                    </ScaleFade>
                  )}
                </Box>
              </Flex>
            </SlideFade>
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

export default UserForm;
