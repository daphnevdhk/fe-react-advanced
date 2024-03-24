import {
  Box,
  Heading,
  Text,
  Stack,
  Image,
  useColorModeValue,
  LinkBox,
  Skeleton,
} from "@chakra-ui/react";
import { Tags } from "../common/Tags";
import { CalendarIcon } from "@chakra-ui/icons";
import { formatDate } from "../../logic/date";
import { useNavigate } from "react-router-dom";

export const EventCard = ({ event, ...rest }) => {
  const navigate = useNavigate();
  return (
    <LinkBox
      maxW={"445px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.900")}
      boxShadow={"2xl"}
      rounded={"md"}
      p={6}
      overflow={"hidden"}
      onClick={() => navigate(`/event/${event.id}`)}
      _hover={{
        transform: "translateY(2px)",
        boxShadow: "lg",
      }}
      {...rest}
    >
      <Box h={"210px"} bg={"gray.100"} mt={-6} mx={-6} mb={6} pos={"relative"}>
        <Image
          fallback={<Skeleton h={"100%"} w={"100%"} />}
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

        <Text color={"gray.500"}>
          <CalendarIcon /> {formatDate(event.startTime)}
          {" / "}
          {formatDate(event.endTime)}
        </Text>
      </Stack>
    </LinkBox>
  );
};
