import { Button as ChackraButton } from "@chakra-ui/react";

export const Button = ({ children, ...rest }) => (
  <ChackraButton
    size={{ base: "md", sm: "sm", lg: "lg" }}
    textTransform={"uppercase"}
    _hover={{
      transform: "translateY(2px)",
      boxShadow: "lg",
    }}
    colorScheme="teal"
    {...rest}
  >
    {children}
  </ChackraButton>
);
