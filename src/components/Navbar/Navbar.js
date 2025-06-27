import React, { useEffect } from "react";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// import action types needed and actions for dispatching
import { LOGOUT } from "../../constants/actionTypes";
import { getUsers } from "../../actions/users";
// import icons from react-icons library
import { BsChevronDown } from "react-icons/bs";
// import { BsSearch } from "react-icons/bs";

function NavbarComp({ localUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // SEARCH CAPABILITIES
  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setSearchParams(e.target.value);
  // };

  // const clientId = process.env.REACT_APP_clientId;

  const googleLogoutSuccess = () => {
    dispatch({ type: LOGOUT });

    navigate("/auth");
  };

  return (
    <Navbar className="d-flex navbar">
      <Link to="/" className="logo_linktohome">
        <Navbar.Brand className="d-flex align-items-center">
          <div className="d-flex logo text-center">
            <div className="logo_it text-center">IT</div>
            <div className="logo_hub text-center">HUB</div>
          </div>
        </Navbar.Brand>
      </Link>
      <Nav className="me-auto"></Nav>
      <div className="custom-links d-flex flex-row">
        {localUser ? (
          <>
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                {
                  <img
                    alt="avatar"
                    className="navbar_avatar"
                    src={localUser.imageUrl}
                  />
                }
                <Dropdown className="d-flex align-self-center align-items-center justify-content-center">
                  <Dropdown.Toggle variant="cleared">
                    <BsChevronDown />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align={"end"}>
                    <Link
                      className="p-3 link"
                      to={`/${localUser.username || localUser.username}`}
                    >
                      {localUser.name || localUser.name}
                    </Link>
                    <Dropdown.Item>
                      <span>Settings</span>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      {/* <GoogleLogout
                        render={(renderprops) => (
                        )}
                        clientId={clientId}
                        onLogoutSuccess={googleLogoutSuccess}
                      /> */}
                      <div
                        style={{ color: "red" }}
                        onClick={googleLogoutSuccess}
                      >
                        Log out
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link style={{ color: "white" }} to="auth">
              Sign In
            </Link>
          </>
        )}
      </div>
    </Navbar>
  );
}

export default NavbarComp;
