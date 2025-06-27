import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Form, Row, Image, Button } from "react-bootstrap";
import Input from "../General/Input";
import { getUsers, updateUser, deleteUser } from "../../actions/users";
import FileBase from "react-file-base64";
import { useParams } from "react-router-dom";

const Edit = () => {
  const dispatch = useDispatch();
  let currentUser = JSON.parse(localStorage.getItem("profile"))?.result;
  let id = currentUser?._id;

  const username = useParams().username;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [userData, setUserData] = useState({
    ...useSelector((state) =>
      state?.reducers?.users.find((user) => user?.username === username),
    ),
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePreferences = (e) => {
    const list = e.target.value.split(",");
    const trimedList = list.map((elem) => elem.trim());
    setUserData({
      ...userData,
      preferences: { ...userData.preferences, [e.target.name]: trimedList },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(id, { ...userData }));
  };

  return (
    <Container>
      {!(Object.keys(userData).length === 0 || userData === null) ? (
        <>
          <Row className="d-flex justify-content-center mt-3">
            <Col className="d-flex justify-content-center ">
              <Form onSubmit={handleSubmit} className="d-flex flex-row">
                <Container fluid className="page-wrapper">
                  <Row className="d-flex justify-content-center  ">
                    <Col className="d-flex justify-content-center  flex-column ">
                      <Image
                        className="align-self-center mt-3"
                        src={userData.imageUrl}
                        style={{
                          borderRadius: "50%",
                          width: "10rem",
                          height: "10rem",
                          objectFit: "cover",
                        }}
                        name="imageUrl"
                        onChange={handleChange}
                      />
                      <div className="my-3">
                        <FileBase
                          type="file"
                          multiple={false}
                          onDone={({ base64 }) =>
                            setUserData({ ...userData, imageUrl: base64 })
                          }
                        />
                      </div>
                      <Form.Group
                        controlId="formFile"
                        className="my-3"
                      ></Form.Group>
                      <Input
                        name="username"
                        req
                        label="User Name"
                        value={userData.username}
                        handleChange={handleChange}
                      />
                      <Input
                        name="name"
                        req
                        label="Name"
                        value={userData.name}
                        handleChange={handleChange}
                      />
                      <Input
                        name="email"
                        req
                        type="email"
                        label="Email"
                        value={userData.email}
                        handleChange={handleChange}
                      />
                      <Form.Group>
                        <Form.Label name="label">About me</Form.Label>
                        <Form.Control
                          aria-describedby="label"
                          as="textarea"
                          rows="3"
                          name="bio"
                          label="Bio"
                          value={userData.bio}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="d-flex align-items-center ">
                      <div>
                        <h5 className="text-center mt-3">Preferences</h5>
                        <div
                          className="px-4 py-2 "
                          style={{
                            border: "1px solid grey",
                            borderRadius: "25px",
                          }}
                        >
                          <h6 className="text-center">Music</h6>
                          <Input
                            name="musicgenre"
                            label="Genres"
                            value={userData.preferences.musicgenre}
                            handleChange={handlePreferences}
                          />
                          <Input
                            name="musicbest"
                            label="Best"
                            value={userData.preferences.musicbest}
                            handleChange={handlePreferences}
                          />
                        </div>
                        <div
                          className="px-4 py-2 my-3"
                          style={{
                            border: "1px solid grey",
                            borderRadius: "25px",
                          }}
                        >
                          <h6 className="text-center">Moovies</h6>
                          <Input
                            name="mooviesgenre"
                            label="Genres"
                            value={userData.preferences.mooviesgenre}
                            handleChange={handlePreferences}
                          />
                          <Input
                            name="mooviesbest"
                            label="Best"
                            value={userData.preferences.mooviesbest}
                            handleChange={handlePreferences}
                          />
                        </div>
                        <div
                          className="px-4 py-2 my-3"
                          style={{
                            border: "1px solid grey",
                            borderRadius: "25px",
                          }}
                        >
                          <h6 className="text-center">Games</h6>
                          <Input
                            name="gamesgenre"
                            label="Genres"
                            value={userData.preferences.gamesgenre}
                            handleChange={handlePreferences}
                          />
                          <Input
                            name="gamesbest"
                            label="Best"
                            value={userData.preferences.gamesbest}
                            handleChange={handlePreferences}
                          />
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex justify-content-end ">
                      <Button
                        className="w-50 my-3 btn-ithub"
                        variant="danger"
                        onClick={() => dispatch(deleteUser(userData?._id))}
                      >
                        Delete
                      </Button>
                      <Button
                        className="w-50 my-3"
                        variant="darktheme"
                        type="submit"
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Form>
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Edit;
