import { Flex, Box, Avatar, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAverageRGB, toDataURL } from "../utils/imageToColor";

export default function MatchedCard({ data }: any) {
  const genders: any = {
    male: "he/him",
    female: "she/her",
    "non-binary": "they/them",
    null: "doesn't matter",
  };
  const [copied, setCopied] = useState(false);
  const [color, setColor] = useState("#8470FF");
  const getColor = async () => {
    let img: any = document.createElement("img");
    const Vibrant = require("node-vibrant");
    await toDataURL(data?.image, (res: any) => {
      img.setAttribute("src", res);
      Vibrant.from(res).getPalette((err: any, palette: any) => {
        const col = palette.Vibrant._rgb;
        console.log(col);
        setColor(`rgb(${col[0]},${col[1]},${col[2]})`);
      });
      /*const res_ = getAverageRGB(img);
      console.log(res_);
      setColor(`rgb(${res_.r},${res_.g},${res_.b})`);*/
    });
  };
  useEffect(() => {
    getColor();
  }, []);
  return (
    <Flex
      bg="rgba(0, 0, 0, 0.39)"
      rounded="3xl"
      overflow="hidden"
      align="center"
    >
      <Box w="80px" h="110px" bg={color} roundedRight="3xl" />
      <Box px="6" mr="-60px" transform="translateX(-60px)">
        <Avatar
          ring="4px"
          ringColor="#2B3162"
          w="70px"
          h="70px"
          name={data?.username || "Anonymous"}
          src={data?.image}
        />
      </Box>
      <Flex direction="column">
        <Flex pr="10" align="center" experimental_spaceX="2">
          <Text fontWeight="bold" fontSize="xl" maxW="120px" isTruncated>
            {data?.username || "Anonymous"}
          </Text>
          <Text fontSize="sm" color="whiteAlpha.600">
            {genders[data?.gender]}
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
          onClick={async () => {
            await navigator.clipboard.writeText(data?.username);
            setCopied(true);
          }}
          rounded="full"
        >
          {copied ? "copied username" : "send friendreq"}
        </Button>
      </Flex>
    </Flex>
  );
}
