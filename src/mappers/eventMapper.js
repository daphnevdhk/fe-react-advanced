import { getUser } from "../api/userApi";
import { getCategories } from "../api/categoryApi";

export const mapEvent = async (event) => {
  return {
    ...event,
    createdByUser: await getUser(event.createdBy),
    categories: await getCategories(event.categoryIds),
  };
};
