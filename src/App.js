import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComp from "./components/Navbar/Navbar";
import Home from "./components/Home/Home.js";
import Auth from "./components/Auth/Auth.js";
import Profile from "./components/Profile/Profile.js";
import Edit from "./components/Profile/Edit";
import Project from "./components/Projects/Project";
import EditProject from "./components/Projects/EditProject";
import { getUsers } from "./actions/users";
import { getPosts } from "./actions/posts";
import { fetchProjects } from "./actions/projects";
import { getLocalStorageUser } from "./utils/utils";

const App = () => {
  const dispatch = useDispatch();
  const localUser = getLocalStorageUser();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getPosts());
    dispatch(fetchProjects());
  }, [dispatch]);

  const posts = useSelector((state) => state?.reducers?.posts);
  const users = useSelector((state) => state?.reducers?.users);
  const projects = useSelector((state) => state?.reducers?.projects);

  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
      <Container fluid>
        <Row>
          <NavbarComp localUser={localUser} />
        </Row>
        <Row className="d-flex flex-wrap justify-content-center mt-3 gap-3">
          <Routes>
            <Route
              path="/"
              element={<Home posts={posts} projects={projects} users={users} />}
            />
            <Route path="/auth" element={<Auth />} />
            <Route path={`/:username/edit`} element={<Edit />} />
            <Route
              path={`/:username/*`}
              element={<Profile users={users} posts={posts} />}
            />
            <Route
              path={`/project/:projectId`}
              element={<Project projects={projects} />}
            />
            <Route
              path={`/project/:projectId/edit`}
              element={<EditProject />}
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};

export default App;
