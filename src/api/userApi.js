import axios from "axios";

export const getUsers = async () => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/users`;
  const response = await axios.get(url);
  return response.data;
};

export const getUser = async (userId) => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/users/${userId}`;
  const response = await axios.get(url);
  return response.data;
};
