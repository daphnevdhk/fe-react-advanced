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
  Button,
  DrawerFooter,
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

export const EventsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isFethcing, setIsFethcing] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchFilterState, dispatch] = useReducer(eventSearchFilterReducer, {
    search: "",
    categories: [],
  });

  useEffect(() => {
    fetchEvents(searchFilterState);
  }, [searchFilterState]);

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
      <Button onClick={onOpen}>New</Button>
      <SimpleGrid minChildWidth="300px" spacing="20px">
        {renderedEvents}
      </SimpleGrid>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <EventForm event={{}} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
