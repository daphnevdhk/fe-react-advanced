import React from "react";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { EventSkeleton } from "../components/events/EventSkeleton";
import { EventCard } from "../components/events/EventCard";
import { getEvents } from "../api/eventApi";
import { SearchAndFilter } from "../components/events/SearchAndFilter";

export const EventsPage = () => {
  const [isFethcing, setIsFethcing] = useState(false);
  const [events, setEvents] = useState([]);

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
    console.log(categoryId, isSelected);
  };

  const onSearchChange = (search) => {
    console.log(search);
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
        activeCategoryIds={[1, 2]}
        onTagSelectionChange={onTagSelectionChange}
        onSearchChange={onSearchChange}
      />
      <SimpleGrid minChildWidth="300px" spacing="20px">
        {renderedEvents}
      </SimpleGrid>
    </>
  );
};
