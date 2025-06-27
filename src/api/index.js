import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = () => API.get("/posts");

export const createPost = (newPost) => API.post("/posts", newPost);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const fetchProjects = () => API.get("/projects");

export const createProject = (newProject) => API.post("/projects", newProject);

export const updateProject = (id, updatedProject) =>
  API.patch(`/projects/${id}`, updatedProject);

export const deleteProject = (id) => API.delete(`/projects/${id}`);

export const signIn = (formData) => API.post("/users/signin", formData);

export const signUp = (formData) => API.post("/users/signup", formData);

export const getUsers = () => API.get(`/users`);

export const updateUser = (id, updatedUser) =>
  API.post(`/users/${id}`, updatedUser);

export const deleteUser = (id) => API.post(`/users/${id}`);

export const followUser = (id, followingId) =>
  API.post(`/users/${id}/${followingId}/follow`);

export const unfollowUser = (id, unfollowingId) =>
  API.post(`/users/${id}/${unfollowingId}/unfollow`);
