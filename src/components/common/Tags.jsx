import { Tag, Stack, Flex } from "@chakra-ui/react";
import { stringToColor } from "../../logic/color";

export const Tags = ({ tags }) => {
  const renderedTags = tags.map((s, index) => (
    <Tag key={index} backgroundColor={stringToColor(s)} mx={1}>
      {s}
    </Tag>
  ));

  return (
    <Stack>
      <Flex>{renderedTags}</Flex>
    </Stack>
  );
};
