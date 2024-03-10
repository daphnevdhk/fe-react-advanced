import React from "react";
import { Heading, SimpleGrid } from "@chakra-ui/react";
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
} from "../reducers/eventsReducer";

export const EventsPage = () => {
  const [isFethcing, setIsFethcing] = useState(false);
  const [events, setEvents] = useState([]);
  const [searchFilterState, dispatch] = useReducer(eventSearchFilterReducer, {
    search: "",
    categories: [],
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsFethcing(true);
    const response = await getEvents();
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
      <SimpleGrid minChildWidth="300px" spacing="20px">
        {renderedEvents}
      </SimpleGrid>
    </>
  );
};
