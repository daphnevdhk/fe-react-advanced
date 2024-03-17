import React, { createContext, useState, useEffect } from "react";
import { getUsers } from "../api/userApi";
import { getCategories } from "../api/categoryApi";

// Create Context Object
export const SiteContext = createContext();

export const SiteContextProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchUsers();
  }, []);

  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response);
  };

  const fetchUsers = async () => {
    const response = await getUsers();
    setUsers(response);
  };

  return (
    <SiteContext.Provider value={{ categories, users }}>
      {props.children}
    </SiteContext.Provider>
  );
};
