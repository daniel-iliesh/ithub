import {
  FETCH_USERS,
  UPDATE_USER,
  DELETE_USER,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../constants/actionTypes.js";

const users = (users = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      // console.log("FETCH_USERS PAYLOAD - ", action.payload);
      users = action.payload;
      return users;
    case UPDATE_USER:
      // console.log("UPDATE_USERS PAYLOAD - ", action.payload);
      const currentUser = JSON.parse(localStorage.getItem("profile"));
      const user = { result: action.payload, token: currentUser.token };
      localStorage.setItem("profile", JSON.stringify(user));
      users = [...users, user];
      // console.log("users in UPDATE USERS - ", users);
      return users;
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      const currUser = JSON.parse(localStorage.getItem("profile"));
      localStorage.setItem(
        "profile",
        JSON.stringify({ result: action.payload, token: currUser.token }),
      );
      return [...users, action.payload];
    case DELETE_USER:
      return users.filter((user) => user._id !== action.payload);
    default:
      return users;
  }
};

export default users;
