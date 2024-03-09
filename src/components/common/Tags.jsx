import { Tag } from "@chakra-ui/react";
import { userStringToColor } from "../../hooks/useStringToColor";

export const Tags = ({ tags }) =>
  tags.map((s, index) => (
    <Tag key={index} colorScheme={userStringToColor(s)}>
      {s}
    </Tag>
  ));
