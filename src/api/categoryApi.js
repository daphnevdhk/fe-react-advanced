import axios from "axios";

export const getCategories = async () => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/categories`;
  const response = await axios.get(url);
  return response.data;
};
