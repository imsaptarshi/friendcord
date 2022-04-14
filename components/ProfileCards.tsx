import { AspectRatio, Avatar, Box, Flex, Text, Image } from "@chakra-ui/react";
import { FaCross, FaExclamationCircle, FaHeart, FaStar } from "react-icons/fa";
import { meta } from "../utils/meta";
import { Heart, X } from "react-feather";

export default function ProfileCard() {
  return (
    <Box
      rounded="2xl"
      className="not-selectable"
      bg="rgba(0, 0, 0, 0.39)"
      overflow="hidden"
      w="full"
      maxW="300px"
      minW="300px"
    >
      <Box w="full" h="100px" bg={"#8470FF"} />
      <Box px="6" mb="-38px" transform="translateY(-38px)">
        <Avatar
          ring="4px"
          ringColor="#2B3162"
          w="70px"
          h="70px"
          name="Randi"
          src="https://i.scdn.co/image/ab6775700000ee85b52d22d59773eb2b0841116a"
        />
      </Box>
      <Flex px="6" mt="4" align="center" experimental_spaceX="2">
        <Text fontWeight="bold" fontSize="xl" maxW="140px" isTruncated>
          Sap#6969
        </Text>
        <Text fontSize="sm" color="whiteAlpha.600">
          he/him
        </Text>
      </Flex>
      <Box px="6" mt="4">
        <Text fontSize="10px" fontWeight="semibold" color="whiteAlpha.700">
          INTERESTS
        </Text>

        <Flex mt="2">
          <Flex
            cursor="pointer"
            align="center"
            mr="2"
            mb="3"
            rounded="full"
            p="1.5"
            pr="4"
            transitionDuration="200ms"
            bg={"whiteAlpha.300"}
          >
            <AspectRatio ratio={1} w="5" mr="2">
              <Image
                src={meta.preferences[0].graphic}
                rounded="full"
                w="full"
                alt="."
              />
            </AspectRatio>
            <Text fontSize="xs" fontWeight="semibold">
              {meta.preferences[0].topic}
            </Text>
          </Flex>
        </Flex>
        <Flex wrap="wrap">
          <Flex
            cursor="pointer"
            align="center"
            mr="2"
            mb="3"
            rounded="full"
            p="1.5"
            pr="4"
            transitionDuration="200ms"
            bg={"brand.blurple"}
          >
            <Box mr="2" ml="1.5" mt="1" mb="1.5">
              <FaStar size="12px" />
            </Box>
            <Text fontSize="xs" fontWeight="semibold">
              {"you both love coding"}
            </Text>
          </Flex>
          <Flex
            cursor="pointer"
            align="center"
            mr="2"
            mb="3"
            rounded="full"
            p="1.5"
            pr="4"
            transitionDuration="200ms"
            bg={"brand.blurple"}
          >
            <Box mr="2" ml="1.5" mt="1" mb="1.5">
              <FaStar size="12px" />
            </Box>
            <Text fontSize="xs" fontWeight="semibold">
              {"you both love anime"}
            </Text>
          </Flex>
        </Flex>
        <Box my="6">
          <Flex experimental_spaceX={6} justify="center">
            <Box p="4" rounded="full" bg="whiteAlpha.400" color="white">
              <X strokeWidth="3px" />
            </Box>
            <Box p="4" rounded="full" bg="brand.blurple" color="white">
              <Heart fill="white" />
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
