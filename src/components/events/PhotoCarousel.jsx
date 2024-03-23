import { Box, Image, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const PhotoCarousel = () => {
  const images = [
    <Image
      key="1"
      fallback={<Skeleton h={"100%"} w={"100%"} />}
      fit="cover"
      h={"100%"}
      w={"100%"}
      src="https://ymcasouthflorida.org/wp-content/uploads/2019/12/AA2I8910-scaled.jpg"
    />,
    <Image
      key="2"
      fallback={<Skeleton h={"100%"} w={"100%"} />}
      fit="cover"
      h={"100%"}
      w={"100%"}
      src="https://www.ctvnews.ca/polopoly_fs/1.5118552.1600965663!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg"
    />,
    <Image
      key="3"
      fallback={<Skeleton h={"100%"} w={"100%"} />}
      fit="cover"
      h={"100%"}
      w={"100%"}
      src="https://th.bing.com/th/id/R.ce44791bbda5945db3f1cecd41d4ef37?rik=O1lU%2bFv4JWGG5Q&pid=ImgRaw&r=0"
    />,
    <Image
      key="4"
      fallback={<Skeleton h={"100%"} w={"100%"} />}
      fit="cover"
      h={"100%"}
      w={"100%"}
      src="https://s3.eu-west-2.amazonaws.com/ws-activestirling/production/Badminton/_1200x630_crop_center-center_none/Badminton-3.jpg"
    />,
  ]; // replace with your image paths
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // change image every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [images.length]);

  return (
    <Box height={"xs"} width="100%">
      {images[index]}
    </Box>
  );
};
