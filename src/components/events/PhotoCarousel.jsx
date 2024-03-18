import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const PhotoCarousel = () => {
  const images = [
    "https://ymcasouthflorida.org/wp-content/uploads/2019/12/AA2I8910-scaled.jpg",
    "https://th.bing.com/th/id/R.ce44791bbda5945db3f1cecd41d4ef37?rik=O1lU%2bFv4JWGG5Q&pid=ImgRaw&r=0",
  ]; // replace with your image paths
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // change image every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [images.length]);

  return (
    <Box
      height={"xs"}
      width="100%"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundImage={`url(${images[index]})`}
    ></Box>
  );
};
