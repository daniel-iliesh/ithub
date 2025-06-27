import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import Input from "../General/Input";
import { useDispatch } from "react-redux";
import { createProject } from "../../actions/projects";

const initProjectData = {
  pname: "",
  description: "",
  tags: [""],
  creator: "",
  image: "",
};

const CreateProject = () => {
  const dispatch = useDispatch();
  let currentUser =
    JSON.parse(localStorage.getItem("profile")).result ||
    JSON.parse(localStorage.getItem("profile"));
  const id = currentUser?._id;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProject({ ...ProjectData, creator: id }));
  };

  const handleChange = (e) => {
    setProjectData({ ...ProjectData, [e.target.name]: e.target.value });
  };

  const handleTags = (e) => {
    const tagsList = e.target.value.trim().split(",");
    setProjectData({ ...ProjectData, tags: tagsList });
  };

  const [ProjectData, setProjectData] = useState({ ...initProjectData });

  return (
    <Row>
      <Col className="d-flex-inline justify-content-center">
        <Form onSubmit={handleSubmit}>
          <h5>Create project</h5>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="pname"
              placeholder="Enter the name of the project"
              value={FormData.pname}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={FormData.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Input
            name="tags"
            label="Tags"
            value={FormData.tags}
            handleChange={handleTags}
          />
          <div className="d-flex mt-2 justify-content-end">
            <Button variant="darktheme" type="submit">
              Create
            </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default CreateProject;
