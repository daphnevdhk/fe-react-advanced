import React from "react";
import { Heading, SimpleGrid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { EventSkeleton } from "../components/events/EventSkeleton";
import { EventCard } from "../components/events/EventCard";
import axios from "axios";

export const EventsPage = () => {
  const [isFethcing, setIsFethcing] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsFethcing(true);
    const response = await axios.get("http://localhost:3001/events");
    console.log("fetching");
    setEvents(response.data);

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
