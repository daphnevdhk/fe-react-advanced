import React from "react";
import {
  Heading,
  Container,
  SimpleGrid,
  Flex,
  Image,
  Box,
  Stack,
  StackDivider,
  useColorModeValue,
  Button,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { Tags } from "../components/common/Tags";
import { CalendarIcon } from "@chakra-ui/icons";
import { useFormatDate } from "../hooks/useFormatDate";

export const EventPage = () => {
  const event = useLoaderData();
  console.log(event);
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"recipe image"}
            src={event.image}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {event.title}
            </Heading>
            <Box mt={2}>
              <Tags tags={event.categories.map((c) => c.name)} />
            </Box>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <Box>
              <text>{event.description}</text>
            </Box>

            <Box>
              <title>hoi</title>
            </Box>
          </Stack>

          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Avatar
              src={event.createdByUser.image}
              size={{ base: "lg", sm: "md", lg: "2xl" }}
            />
            <Stack direction={"column"} spacing={0}>
              <Text fontWeight={600}>{event.createdByUser.name}</Text>
              <Text color={"gray.500"}>
                <CalendarIcon /> {useFormatDate(event.startTime)}
                {" / "}
                {useFormatDate(event.endTime)}
              </Text>
            </Stack>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={"green.500"}
            color={"white"}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Close
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  );
};
