import React from "react";
import {
  Heading,
  SimpleGrid,
  useDisclosure,
  Drawer,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { useState, useEffect, useReducer } from "react";
import { EventSkeleton } from "../components/events/EventSkeleton";
import { EventCard } from "../components/events/EventCard";
import { getEvents } from "../api/eventApi";
import { SearchAndFilter } from "../components/events/SearchAndFilter";
import {
  eventSearchFilterReducer,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  SET_SEARCH,
} from "../reducers/eventSearchFilterReducer";
import { EventForm } from "../components/event/EventForm";
import { postEvent } from "../api/eventApi";
import { useNotification } from "../hooks/use-notification";
import { AddIcon } from "@chakra-ui/icons";

export const EventsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFethcing, setIsFethcing] = useState(false);
  const [events, setEvents] = useState([]);
  const [reload, setReload] = useState(false);
  const { showError, showSuccess } = useNotification();
  const [searchFilterState, dispatch] = useReducer(eventSearchFilterReducer, {
    search: "",
    categories: [],
  });

  useEffect(() => {
    fetchEvents(searchFilterState);

    if (reload) {
      setReload(false);
    }
  }, [searchFilterState, reload]);

  const fetchEvents = async (search) => {
    setIsFethcing(true);
    const response = await getEvents(search);
    setEvents(response);
    setIsFethcing(false);
  };

  const onTagSelectionChange = (categoryId, isSelected) => {
    if (isSelected) {
      dispatch({ type: ADD_CATEGORY, categoryId: categoryId });
    } else {
      dispatch({ type: REMOVE_CATEGORY, categoryId: categoryId });
    }
  };

  const onSearchChange = (search) => {
    dispatch({ type: SET_SEARCH, search: search });
  };

  const onNewItemAdded = async (event) => {
    if (await postEvent(event)) {
      onClose();
      showSuccess("Succes!", `${event.title} added`);
      setReload(true);
    } else {
      showError("Failed!", `Could not add ${event.title}`);
    }
  };

  const loadingPlaceHolder = (
    <>
      <EventSkeleton />
      <EventSkeleton />
      <EventSkeleton />
      <EventSkeleton />
      <EventSkeleton />
      <EventSkeleton />
    </>
  );

  const renderedEvents = isFethcing
    ? loadingPlaceHolder
    : events.map((e) => <EventCard key={e.id} event={e} />);

  return (
    <>
      <Heading>List of events</Heading>
      <SearchAndFilter
        activeCategoryIds={searchFilterState.categories}
        onTagSelectionChange={onTagSelectionChange}
        onSearchChange={onSearchChange}
      />

      <SimpleGrid minChildWidth="300px" spacing="20px">
        {renderedEvents}
      </SimpleGrid>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <EventForm event={{}} onSave={onNewItemAdded} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box position="absolute" bottom="2" right="2">
        <IconButton
          isRound={true}
          variant="solid"
          colorScheme="teal"
          aria-label="Done"
          size="lg"
          onClick={onOpen}
          icon={<AddIcon />}
          _hover={{
            transform: "translateY(2px)",
            boxShadow: "lg",
          }}
        />
      </Box>
    </>
  );
};
