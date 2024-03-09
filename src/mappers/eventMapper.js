import { getUser } from "../api/userApi";
import { getCategories } from "../api/categoryApi";

export const mapEvent = async (event) => {
  const createdByUser = await getUser(event.createdBy);
  const categories = await getCategories(event.categoryIds);
  return {
    ...event,
    createdByUser: createdByUser,
    categories: categories,
  };
};
