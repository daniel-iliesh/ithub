import {
  FETCH_PROJECTS,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "../constants/actionTypes.js";

const projects = (projects = [], action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return action.payload;
    case DELETE_PROJECT:
      return projects.filter((project) => project._id !== action.payload);
    case CREATE_PROJECT:
      return [...projects, action.payload];
    case UPDATE_PROJECT:
      console.log("projects, action.payload in ", projects, action.payload);
      return projects.map((project) =>
        project._id === action.payload._id ? action.payload : project,
      );
    default:
      return projects;
  }
};

export default projects;
