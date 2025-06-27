import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import Input from "../General/Input";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import { getUsers } from "../../actions/users";

const avatarImg =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

const initState = {
  userName: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  imageUrl: avatarImg,
  bio: "",
  friends: [],
  work: {
    title: "Work Title",
    company: "Company Inc.",
    beginDate: new Date("11/12/2021"),
    finishDate: new Date("11/12/2022"),
    location: "City, Country",
    skills: ["skill1", "skill2"],
  },
  studies: {
    school: "School name",
    field: "Informatics",
    location: "City, Country",
    beginDate: new Date("11/12/2021"),
    finishDate: new Date("11/12/2021"),
  },
  preferences: {
    musicgenre: ["Music Genre"],
    musicbest: ["Music Best"],
    mooviesgenre: ["moovies Genre"],
    mooviesbest: ["moovies Best"],
    gamesgenre: ["games Genre"],
    gamesbest: ["games Best"],
  },
};

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignup, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initState);
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);

  // const clientId =
  //   "424340912164-pacifsoe4ghmu5kfjpe6c71hvvo8qd36.apps.googleusercontent.com";
  // const SCOPE =
  //   "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";

  const switchAuth = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

    if (isSignup) {
      dispatch(signup(formData, navigate)).then((error) => setError(error));
      dispatch(getUsers());
    } else {
      dispatch(signin(formData, navigate)).then((error) => setError(error));
      dispatch(getUsers());
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  useEffect(() => {
    // const start = () => {
    //   gapi.client
    //     .init({
    //       clientId: clientId,
    //       scope: SCOPE,
    //     })
    //     .then();
    // };
    // gapi.load("client:auth2", start);
  }, []);

  // const googleSuccess = (res) => {
  //   const result = res?.profileObj;
  //   const token = res?.tokenId;

  //   try {
  //     dispatch({ type: "AUTH", data: { result, token } });
  //     dispatch(getUsers());
  //     dispatch(getPosts());
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const googleFailure = (res) => {
  //   console.log("Login failed ! res:", res);
  // };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col xs={12} sm={10} md={6} lg={4} className="page-wrapper p-4">
          <h2 className="text-center mt-2 mb-5">
            {isSignup ? "Sign Up" : "Sign In"}
          </h2>
          <Form noValidate validated={validated}>
            {isSignup && (
              <>
                <Input
                  value={formData.username}
                  invalidFeedback="Username field is required"
                  type="text"
                  req
                  name="userName"
                  label="User Name"
                  handleChange={handleChange}
                />
                <Input
                  value={formData.firstName}
                  invalidFeedback="First name field is required"
                  type="text"
                  req
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                />
                <Input
                  value={formData.lastName}
                  invalidFeedback="Last name field is required"
                  type="text"
                  req
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                />
              </>
            )}
            <Input
              value={formData.email}
              invalidFeedback="Email field is required"
              req
              name="email"
              label="Email"
              type="email"
              handleChange={handleChange}
            />
            <Input
              value={formData.password}
              invalidFeedback="Password field is required"
              name="password"
              label="Password"
              type="password"
              handleChange={handleChange}
            />

            {error ? (
              <>
                <Alert className="mt-3" variant="danger">
                  {error.message}
                </Alert>
              </>
            ) : (
              <></>
            )}

            <div className="d-flex flex-column">
              <Button
                className="mt-3"
                variant="darktheme"
                type="submit"
                onClick={handleSubmit}
              >
                {isSignup ? "Sign Up" : "Sing In"}
              </Button>

              {/* <div className="d-grid mt-3">
                <GoogleLogin
                  className="googleLoginBtn btn-ithub"
                  clientId={clientId}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy={"single_host_origin"}
                />
              </div> */}
              <Button className="mt-3" variant="ithub" onClick={switchAuth}>
                {" "}
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account yet? Sign Up"}{" "}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
