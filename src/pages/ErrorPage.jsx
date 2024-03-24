import { Box, Flex, Heading } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/common/Button";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={"red.500"}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign="center"
        >
          <CloseIcon boxSize={"20px"} color={"white"} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Something went wrong
      </Heading>
      <Button
        colorScheme="teal"
        color="white"
        variant="solid"
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </Box>
  );
};
