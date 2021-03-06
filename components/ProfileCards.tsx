import {
  AspectRatio,
  Avatar,
  Box,
  Flex,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaCross,
  FaEnvelope,
  FaExclamationCircle,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { meta } from "../utils/meta";
import { Heart, X } from "react-feather";
import getColors from "get-image-colors";
import { useEffect, useState } from "react";
import { getAverageRGB, toDataURL } from "../utils/imageToColor";
import { User } from "../providers/User.provider";
import CustomButton from "./CustomButton.component";

export default function ProfileCard({
  swipe,
  idx,
  data,
  currentIndex,
  switches,
}: any) {
  const genders: any = {
    male: "he/him",
    female: "she/her",
    "non-binary": "they/them",
    null: "doesn't matter",
  };
  const Vibrant = require("node-vibrant");
  const [color, setColor] = useState("#8470FF");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { user } = User();
  const options = {
    count: 1,
    type: "image/*",
  };

  const getColor = async () => {
    let img: any = document.createElement("img");
    await toDataURL(data?.image, (res: any) => {
      img.setAttribute("src", res);
      Vibrant.from(res).getPalette((err: any, palette: any) => {
        if (palette) {
          let col: any = palette.Vibrant;
          col = col._rgb;
          console.log(col);
          setColor(`rgb(${col[0]},${col[1]},${col[2]})`);
        }
      });
      /*const res_ = getAverageRGB(img);
      console.log(res_);
      setColor(`rgb(${res_.r},${res_.g},${res_.b})`);*/
    });
  };
  useEffect(() => {
    if (window) {
      getColor();
    }
  }, [window, data]);

  return (
    <>
      {data && (
        <Box
          position="relative"
          shadow={"lg"}
          cursor="pointer"
          rounded="2xl"
          className="not-selectable"
          bg="#293156"
          overflow="hidden"
          w="full"
          maxW="300px"
          minW="300px"
        >
          <Box w="full" h="100px" bg={color || "#8470FF"} />
          <Box px="6" mb="-38px" transform="translateY(-38px)">
            <Avatar
              ring="4px"
              ringColor="#2B3162"
              w="70px"
              h="70px"
              name={data?.username || "Anonymous"}
              src={data?.image}
            />
          </Box>
          <Flex px="6" mt="4" align="center" experimental_spaceX="2">
            <Text fontWeight="bold" fontSize="xl" maxW="140px" isTruncated>
              {data?.username || "Anonymous"}
            </Text>
            <Text fontSize="sm" color="whiteAlpha.600">
              {genders[data?.gender]}
            </Text>
          </Flex>
          <Box px="6" mt="4">
            <Text fontSize="10px" fontWeight="semibold" color="whiteAlpha.700">
              INTERESTS
            </Text>
            <Box w="full">
              {" "}
              <Box
                className="interests"
                id={"interests" + idx}
                overflowY="auto"
                scrollBehavior="smooth"
                maxH={{ base: "160px", lg: "144px" }}
                mr="-6"
                pr="6"
                minH={{ base: "160px", lg: "144px" }}
              >
                <Flex mt="2" wrap="wrap">
                  {data?.interests.map((data_: any, key: any) => (
                    <>
                      <Flex
                        key={key}
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
                            src={`/assets/preferences/${data_}.png`}
                            rounded="full"
                            w="full"
                            alt="."
                          />
                        </AspectRatio>
                        <Text fontSize="xs" fontWeight="semibold">
                          {data_}
                        </Text>
                      </Flex>
                      {data?.commonInterests?.includes(data_) && (
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
                            you both love {data_}
                          </Text>
                        </Flex>
                      )}
                    </>
                  ))}
                </Flex>
              </Box>
            </Box>
            <Box my="6">
              <Flex experimental_spaceX={6} justify="center" opacity={0}>
                <Box
                  transitionDuration="200ms"
                  onClick={() => {
                    const left: any = document.getElementById("left");
                    left.click();
                  }}
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
          </Box>
        </Box>
      )}
    </>
  );
}
