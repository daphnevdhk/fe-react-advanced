import {
  Box,
  Flex,
  useColorModeValue,
  Stack,
  useColorMode,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box bg={useColorModeValue("teal", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Heading color="white">Events for you!</Heading>
          </Box>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <IconButton
                isRound={true}
                variant="solid"
                aria-label="Done"
                fontSize="20px"
                onClick={toggleColorMode}
                icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              />
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
