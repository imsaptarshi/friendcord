import { Button } from "@chakra-ui/react";

export default function CustomButton({ children, ...otherProps }: any) {
  return (
    <Button
      fontWeight="bold"
      color="brand.blurple"
      py="5"
      px="10"
      bg="white"
      rounded="full"
      {...otherProps}
    >
      {children}
    </Button>
  );
}
