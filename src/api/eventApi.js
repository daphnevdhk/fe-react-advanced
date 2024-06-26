import axios from "axios";
import { mapEvent } from "../mappers/eventMapper";

//since we enrich the event object we have to clean it again to make sure we dont push wrong properties
const cleanEvent = (event) => {
  const body = {
    createdBy: event.createdBy,
    title: event.title,
    description: event.description,
    image: event.image,
    categoryIds: event.categoryIds,
    location: event.location,
    startTime: event.startTime,
    endTime: event.endTime,
  };

  return body;
};

export const getEvents = async (filter) => {
  let params = {};

  if (filter.search) {
    params = {
      ...params,
      title_like: filter.search,
    };
  }

  if (filter.categories.length > 0) {
    params = {
      ...params,
      categoryIds_like: filter.categories,
    };
  }

  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/events`;
  const response = await axios.get(url, {
    params: params,
    paramsSerializer: {
      indexes: null,
    },
  });

  return response.data;
};

export const getEvent = async (eventId, users, categories) => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/events/${eventId}`;
  const response = await axios.get(url);
  return await mapEvent(response.data, users, categories);
};

export const postEvent = async (event) => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/events`;

  const response = await axios.post(url, cleanEvent(event));

  return response.status === 200 || response.status === 201;
};

export const putEvent = async (eventId, event) => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/events/${eventId}`;

  const response = await axios.put(url, cleanEvent(event));

  return response.status === 200 || response.status === 201;
};

export const deleteEvent = async (eventId) => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/events/${eventId}`;
  const response = await axios.delete(url);

  return response === 204;
};
