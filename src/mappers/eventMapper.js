export const mapEvent = (event, users, categories) => {
  const createdByUser = users.find((u) => u.id == event.createdBy) || {
    name: "",
    image: "",
  };

  const categoriesByEvent = categories.filter((c) =>
    event.categoryIds.some((id) => id == c.id)
  );

  return {
    ...event,
    createdByUser: createdByUser,
    categories: categoriesByEvent,
  };
};
