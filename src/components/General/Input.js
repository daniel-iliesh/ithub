import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

function Input({
  value,
  inputId,
  name,
  type,
  label,
  handleChange,
  placeholder,
  req,
  invalidFeedback,
}) {
  const [currentVisibility, setCurrentVisibility] = useState(false);

  const handlePassword = () => {
    setCurrentVisibility((prevCurrentVisibility) => !prevCurrentVisibility);
  };

  // const handlePasswordStyles = (e) => {
  //   if (e.target.value === "") e.target.style.display = "none";
  // };

  return type === "password" ? (
    <>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <InputGroup>
          <Form.Control
            id="passwordFormControl"
            required={req ? "true" : "false"}
            type={!currentVisibility ? "password" : "text"}
            placeholder="Enter your password..."
            aria-describedby="basic-addon2"
            value={value}
            onChange={handleChange}
            name={name}
          />
          <Form.Control.Feedback type="invalid">
            {invalidFeedback}
          </Form.Control.Feedback>
          <Button
            variant="outline-secondary"
            id="button-addon2"
            onClick={handlePassword}
            name={name}
          >
            {!currentVisibility ? (
              <BsFillEyeSlashFill
                color="whitesmoke"
                style={{
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                }}
              />
            ) : (
              <BsFillEyeFill
                color="whitesmoke"
                style={{
                  borderTopRightRadius: "25px",
                  borderBottomRightRadius: "25px",
                }}
              />
            )}
          </Button>
        </InputGroup>
      </Form.Group>
    </>
  ) : (
    <>
      <Form.Group controlId={inputId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          onChange={handleChange}
          name={name}
          value={value}
          type={type}
          placeholder={placeholder ? placeholder : `Enter your ${label}`}
          required={req ? true : false}
        />
        <Form.Control.Feedback type="invalid">
          {invalidFeedback}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
}

export default Input;
