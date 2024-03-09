import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { Tags } from "../common/Tags";
export const EventCard = ({ event, ...rest }) => {
  console.log(event);
  return (
    <Box
      maxW={"445px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
      {...rest}
    >
      <Box h={"210px"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
        <Image
          src={event.image}
          fit="cover"
          alt="Example"
          h={"100%"}
          w={"100%"}
        />
      </Box>
      <Stack>
        <Tags tags={event.categories.map((c) => c.name)} />
        <Heading
          color={useColorModeValue("gray.700", "white")}
          fontSize={"2xl"}
          fontFamily={"body"}
        >
          {event.title}
        </Heading>
        <Text color={"gray.500"}>{event.description}</Text>
      </Stack>
    </Box>
  );
};
