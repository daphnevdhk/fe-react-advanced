import axios from "axios";
export const getUser = async (userId) => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/users/${userId}`;
  const response = await axios.get(url);
  return response.data;
};
