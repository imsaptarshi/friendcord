import { Flex, Box, Avatar, Text, Button } from "@chakra-ui/react";

export default function MatchedCard() {
  return (
    <Flex
      bg="rgba(0, 0, 0, 0.39)"
      rounded="3xl"
      overflow="hidden"
      align="center"
    >
      <Box w="80px" h="110px" bg={"#8470FF"} roundedRight="3xl" />
      <Box px="6" mr="-60px" transform="translateX(-60px)">
        <Avatar
          ring="4px"
          ringColor="#2B3162"
          w="70px"
          h="70px"
          name="Randi"
          src="https://i.scdn.co/image/ab6775700000ee85b52d22d59773eb2b0841116a"
        />
      </Box>
      <Flex direction="column">
        <Flex pr="10" align="center" experimental_spaceX="2">
          <Text fontWeight="bold" fontSize="xl" maxW="140px" isTruncated>
            Sap#6969
          </Text>
          <Text fontSize="sm" color="whiteAlpha.600">
            he/him
          </Text>
        </Flex>
        <Button
          fontWeight="bold"
          color="white"
          _hover={{ transform: "scale(1.05)" }}
          _focus={{}}
          _active={{ transform: "scale(0.9)" }}
          py="4"
          mt="2"
          px="8"
          mr="10"
          fontSize="sm"
          bg="brand.blurple"
          rounded="full"
        >
          dm on discord
        </Button>
      </Flex>
    </Flex>
  );
}
