import axios from "axios";

export const getCategories = async () => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/categories`;
  const response = await axios.get(url);
  return response.data;
};

export const getCategoriesByIds = async (categoryIds) => {
  const url = `${import.meta.env.VITE_REACT_APP_API_URL}/categories`;
  const response = await axios.get(url, {
    params: { id: categoryIds },
    paramsSerializer: {
      indexes: null,
    },
  });
  return response.data;
};
