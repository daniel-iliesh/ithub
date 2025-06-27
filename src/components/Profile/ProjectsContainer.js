import React from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProjectCard from "../Projects/ProjectCard";
import CreateProject from "../Projects/CreateProject";
import { useParams } from "react-router-dom";
import { getLocalStorageUser } from "../../utils/utils";

const ProjectsContainer = ({ projects }) => {
  const { username } = useParams();
  const localUser = getLocalStorageUser();

  const user = useSelector((state) =>
    state?.reducers?.users.find((user) => user?.username === username),
  );

  const currentUserProjects = useSelector((state) =>
    state?.reducers?.projects.filter(
      (project) => project.creator === user?._id,
    ),
  );

  return (
    <Row className="d-flex flex-column align-items-center justify-content-center gap-3">
      {localUser?.username === username ? (
        <>
          <Col
            className="d-flex-inline justify-content-center page-wrapper p-3"
            xs={12}
            sm={10}
            md={8}
            lg={6}
          >
            <CreateProject />
          </Col>
        </>
      ) : (
        <></>
      )}
      {currentUserProjects && Array.isArray(currentUserProjects) ? (
        <>
          {currentUserProjects.map((project) => (
            <React.Fragment key={project?._id}>
              <Col
                className="d-flex-inline justify-content-center page-wrapper p-3"
                xs={12}
                sm={10}
                md={8}
                lg={6}
              >
                <ProjectCard project={project} />
              </Col>
            </React.Fragment>
          ))}
        </>
      ) : currentUserProjects && typeof currentUserProjects === "object" ? (
        <>
          <Col
            className="d-flex-inline justify-content-center page-wrapper p-3 mt-3"
            xs={12}
            sm={10}
            md={8}
            lg={6}
          >
            <ProjectCard project={currentUserProjects} />
          </Col>
        </>
      ) : (
        <></>
      )}
    </Row>
  );
};

export default ProjectsContainer;
