import { useContext } from "react";
import { SiteContext } from "../contexts/SiteContext";

export const useSiteContext = () => {
  return useContext(SiteContext);
};
