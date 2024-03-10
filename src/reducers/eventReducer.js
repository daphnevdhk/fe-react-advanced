export const SET_CREATEDBY = "set_createdby";
export const SET_TITLE = "set_title";
export const SET_DESCRIPTION = "set_description";
export const SET_IMAGE = "set_image";
export const SET_CATEGORYIDS = "set_categoryids";
export const SET_LOCATION = "set_location";
export const SET_STARTTIME = "set_starttime";
export const SET_ENDTIME = "set_endtime";

export const eventReducer = (state, action) => {
  console.log(action.type, action.payload);
  switch (action.type) {
    case SET_CREATEDBY:
      return { ...state, createdBy: action.payload };
    case SET_TITLE:
      return { ...state, title: action.payload };
    case SET_DESCRIPTION:
      return { ...state, description: action.payload };
    case SET_IMAGE:
      return { ...state, image: action.payload };
    case SET_CATEGORYIDS:
      return { ...state, categoryIds: action.payload };
    case SET_LOCATION:
      return { ...state, location: action.payload };
    case SET_STARTTIME:
      return { ...state, startTime: action.payload };
    case SET_ENDTIME:
      return { ...state, endTime: action.payload };
  }
};
