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
  return response.data;
};
