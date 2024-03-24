export const formatDate = (dateToConvert) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  };

  const date = new Date(dateToConvert);

  return date.toLocaleDateString(undefined, options);
};
