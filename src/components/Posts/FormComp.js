import { useState, useEffect } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { getUsers } from "../../actions/users";

const FormComp = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  let currentUser = JSON.parse(localStorage.getItem("profile"))?.result;
  let id = currentUser?._id;

  const [postData, setPostData] = useState({
    description: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId ? state.reducers.posts.find((p) => p._id === currentId) : null,
  );

  useEffect(() => {
    if (currentId) setPostData({ ...post });
  }, [currentId, post]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, id]);

  const user = useSelector((state) =>
    state?.reducers?.users.find((user) => user._id === id),
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, creator: user?._id }));
    } else {
      dispatch(
        createPost({
          ...postData,
          creator: user?._id,
          creatorImg: user?.imageUrl,
        }),
      );
    }
    clear();
  };

  if (!currentUser) {
    return <Alert variant="danger">You need to log in to create a post.</Alert>;
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      description: "",
      tags: [],
      selectedFile: "",
    });
  };

  const onTagsChange = (e) => {
    const tagsList = e.target.value.trim().split(",");
    setPostData({ ...postData, tags: tagsList });
  };

  return (
    <Container>
      <h4>Add new post</h4>

      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter Description"
            value={postData.description}
            onChange={(e) =>
              setPostData({ ...postData, description: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Tags</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Tags"
            value={postData.tags}
            onChange={onTagsChange}
          />
        </Form.Group>
        <div className="my-3">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Row className="d-flex flex-row justify-content-end" lg={6}>
          <Col>
            <div className="d-flex justify-content-end">
              <Button
                className="mx-1"
                variant="ithub"
                style={{ backgroundColor: "black" }}
                onClick={clear}
              >
                Clear
              </Button>
              <Button variant="darktheme" type="submit">
                Create
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default FormComp;
