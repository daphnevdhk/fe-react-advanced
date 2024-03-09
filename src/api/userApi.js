import axios from "axios";
import { mapEvent } from "../mappers/eventMapper";
export const getUser = async (userId) => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/users/${userId}`;
  const response = await axios.get(url);
  return response.data.Map((e) => mapEvent(e));
};
