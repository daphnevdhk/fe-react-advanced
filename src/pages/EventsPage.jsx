import React from "react";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { EventSkeleton } from "../components/events/EventSkeleton";
import { EventCard } from "../components/events/EventCard";
import { getEvents } from "../api/eventApi";

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
      <SimpleGrid minChildWidth="300px" spacing="20px">
        {renderedEvents}
      </SimpleGrid>
    </>
  );
};
