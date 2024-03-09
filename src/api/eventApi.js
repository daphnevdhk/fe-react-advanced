import axios from "axios";
import { mapEvent } from "../mappers/eventMapper";
export const getEvents = async () => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/events`;
  const response = await axios.get(url);

  return await Promise.all(response.data.map((e) => mapEvent(e)));
};
