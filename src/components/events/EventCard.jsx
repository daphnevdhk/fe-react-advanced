export const EventCard = ({ event, ...rest }) => {
  return <div {...rest}>{event.title}</div>;
};
