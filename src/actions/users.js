import * as api from "../api";
import {
  FETCH_USERS,
  UPDATE_USER,
  DELETE_USER,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../constants/actionTypes.js";

// Action Creators
export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();

    dispatch({ type: FETCH_USERS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = (id, updatedUser) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, updatedUser);

    dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await api.deleteUser(id);

    dispatch({ type: DELETE_USER, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const followUser = (id, followingId) => async (dispatch) => {
  try {
    const { data } = await api.followUser(id, followingId);

    console.log("data", data);

    dispatch({ type: FOLLOW_USER, payload: data });
  } catch (error) {
    console.log("id", id);
    console.log("followingId", followingId);
    console.log("error in followUser action", error);
  }
};

export const unfollowUser = (id, unfollowingId) => async (dispatch) => {
  try {
    const { data } = await api.unfollowUser(id, unfollowingId);

    console.log("data", data);
    console.log("unfollow action here");
    dispatch({ type: UNFOLLOW_USER, payload: data });
  } catch (error) {
    console.log("id", id);
    console.log("unfollowingId", unfollowingId);
    console.log("error in unfollowUser action", error);
  }
};
