import axios from "axios";
export const getEvents = async () => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/events`;
  const response = await axios.get(url);
  return response.data;
};
