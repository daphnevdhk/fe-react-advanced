import React from "react";
import { Heading } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const EventPage = () => {
  const event = useLoaderData();
  console.log(event);
  return <Heading>Event</Heading>;
};
