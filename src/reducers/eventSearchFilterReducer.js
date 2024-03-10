const SET_SEARCH = "set_search";
const REMOVE_CATEGORY = "remove_category";
const ADD_CATEGORY = "add_category";

const eventSearchFilterReducer = (state, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return {
        ...state,
        search: action.search,
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter((id) => id != action.categoryId),
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.categoryId],
      };
  }
};

export { eventSearchFilterReducer, SET_SEARCH, REMOVE_CATEGORY, ADD_CATEGORY };
