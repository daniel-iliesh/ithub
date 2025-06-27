import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Image, Button } from "react-bootstrap";
import {
  fetchProjects,
  updateProject,
  deleteProject,
} from "../../actions/projects";
import Input from "../General/Input";
import FileBase from "react-file-base64";

const EditProject = () => {
  const dispatch = useDispatch();
  const projectId = useParams().projectId;

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  const project = useSelector((state) =>
    state?.reducers?.projects.find((project) => project._id === projectId),
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProject(project._id, { ...projectData }));
  };

  const [projectData, setProjectData] = useState({ ...project });

  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
    console.log(projectData);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Container>
              <Row className="d-flex justify-content-center">
                <Col
                  lg={6}
                  className="d-flex flex-column page-wrapper p-5 mt-3"
                >
                  <h4 className=" mb-3 text-center">
                    Edit project - {projectData?.pname}
                  </h4>
                  <Image
                    style={{
                      borderRadius: "50%",
                      width: "100px",
                      height: "100px",
                    }}
                    src={projectData?.image}
                  />
                  <div className="my-3">
                    <FileBase
                      type="file"
                      multiple={false}
                      onDone={({ base64 }) =>
                        setProjectData({ ...projectData, image: base64 })
                      }
                    />
                  </div>
                  <Input
                    name="pname"
                    type="text"
                    label="Project name"
                    value={projectData?.pname}
                    handleChange={handleChange}
                  />
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      name="description"
                      as="textarea"
                      value={projectData?.description}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Input
                    name="tags"
                    type="text"
                    label="Tags"
                    value={projectData?.tags}
                    handleChange={handleChange}
                  />
                  <div className="mt-3 d-flex flex-row align-items-stretch">
                    <Button
                      className="mt-3 w-50 btn-ithub"
                      variant="danger"
                      onClick={() => dispatch(deleteProject(projectData?._id))}
                    >
                      Delete
                    </Button>
                    <Button
                      className="mt-3 w-50 "
                      variant="darktheme"
                      type="submit"
                    >
                      Save
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default EditProject;
