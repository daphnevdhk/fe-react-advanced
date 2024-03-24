import React, { useState, useEffect } from "react";
import {
  Heading,
  SimpleGrid,
  Flex,
  Image,
  Box,
  Stack,
  StackDivider,
  useColorModeValue,
  Avatar,
  Text,
  ButtonGroup,
  LinkBox,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Skeleton,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { getEvent } from "../api/eventApi";
import { Tags } from "../components/common/Tags";
import { CalendarIcon } from "@chakra-ui/icons";
import { formatDate } from "../logic/date";
import { useNavigate } from "react-router-dom";
import { EventForm } from "../components/event/EventForm";
import { putEvent } from "../api/eventApi";
import DeleteConfirmation from "../components/event/DeleteConfirmation";
import { deleteEvent } from "../api/eventApi";
import { useNotification } from "../hooks/useNotification";
import { Button } from "../components/common/Button";
import { Link } from "react-router-dom";
import { useSiteContext } from "../hooks/useSiteContext";

export const EventPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();
  const [event, setEvent] = useState(null);
  const [reload, setReload] = useState(false);
  const { users, categories } = useSiteContext();
  const editFormDisclosure = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchEvent();
    if (reload) {
      setReload(false);
    }
  }, [reload]);

  const fetchEvent = async () => {
    const response = await getEvent(Number(eventId), users, categories);
    setEvent(response);
  };

  const onUpdate = async (updatedEvent) => {
    if (await putEvent(event.id, updatedEvent)) {
      editFormDisclosure.onClose();
      showSuccess("Success!", `${event.title} updated successful`);
      setReload(true);
    } else {
      showError("Error", `$Could not update {event.title}`);
    }
  };

  const onDelete = async () => {
    await deleteEvent(event.id);
    return goToHome();
  };

  const goToHome = () => {
    return navigate("/");
  };

  if (!event) {
    return <></>;
  }

  return (
    <>
      <Breadcrumb fontWeight="medium" fontSize="lg">
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Details</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <LinkBox maxW={"7xl"}>
        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 18, md: 24 }}
        >
          <Flex>
            <Image
              fallback={
                <Skeleton
                  w={"100%"}
                  h={{ base: "100%", sm: "400px", lg: "500px" }}
                />
              }
              rounded={"md"}
              alt={"event image"}
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
                <Text>{event.description}</Text>
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
                  <CalendarIcon /> {formatDate(event.startTime)}
                  {" / "}
                  {formatDate(event.endTime)}
                </Text>
              </Stack>
            </Stack>

            <ButtonGroup>
              <Button onClick={() => goToHome()}>Close</Button>
              <Button onClick={editFormDisclosure.onOpen}>Edit</Button>
              <Button onClick={onOpen} colorScheme="red">
                Delete
              </Button>
            </ButtonGroup>
          </Stack>
        </SimpleGrid>
      </LinkBox>
      <Drawer
        isOpen={editFormDisclosure.isOpen}
        placement="right"
        onClose={editFormDisclosure.onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <EventForm event={event} onSave={onUpdate} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <DeleteConfirmation
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        title={event.title}
        onConfirmation={onDelete}
      />
    </>
  );
};
