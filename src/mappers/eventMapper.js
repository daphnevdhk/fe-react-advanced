import { getUser } from "../api/userApi";
import { getCategoriesByIds } from "../api/categoryApi";

export const mapEvent = async (event) => {
  const createdByUser = await getUser(event.createdBy);
  const categories = await getCategoriesByIds(event.categoryIds);
  return {
    ...event,
    createdByUser: createdByUser,
    categories: categories,
  };
};
