import axios from "axios";
import { mapEvent } from "../mappers/eventMapper";
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

  console.log(params);
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/events`;
  const response = await axios.get(url, {
    params: params,
    paramsSerializer: {
      indexes: null,
    },
  });

  return await Promise.all(response.data.map((e) => mapEvent(e)));
};

export const getEvent = async (eventId) => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/events/${eventId}`;
  const response = await axios.get(url);
  return await mapEvent(response.data);
};

export const postEvent = async (event) => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/events`;
  //since we enrich the event object we have to clean it again to make sure we dont push wrong properties
  const response = await axios.post(url, {
    createdBy: event.createdBy,
    title: event.title,
    description: event.description,
    image: event.image,
    categoryIds: event.categoryIds,
    location: event.location,
    startTime: event.startTime,
    endTime: event.endTime,
  });

  return response.status === 200 || response.status === 201;
};
