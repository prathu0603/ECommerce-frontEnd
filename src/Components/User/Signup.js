import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    var tester =
      /^[-!#$%&'*+0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    const { name, email, password, cpassword } = user;

    if (!name || !email || !password || !cpassword) {
      toast.warn("Fill All Fields", {
        position: "top-right",
      });
    } else if (!tester.test(email)) {
      toast.warn("Check Email Format ", {
        position: "top-right",
      });
    } else if (password !== cpassword) {
      toast.error("Fill Password field Correctly", {
        position: "top-right",
      });
    } else {
      const data = await fetch(
        "https://e-commerce-site-v1.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      if (data.status === 409) {
        toast.dark("Email Already Registered", {
          position: "top-right",
        });
      } else if (data.status === 200) {
        window.alert("Registration Successful");
        history.push("/signin");
      } else window.alert("Serious Issuesss");
    }
  };

  return (
    <div className="mt-5">
      <Container>
        <h3>Create an Account !</h3>
        <Form method="POST">
          <Row>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputs}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleInputs}
                placeholder="Example@xyz.com"
              />
            </Form.Group>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInputs}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  type="password"
                  name="cpassword"
                  value={user.cpassword}
                  onChange={handleInputs}
                />
              </Form.Group>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Button type="submit" onClick={PostData}>
                Register Account
              </Button>
            </Col>
            <Col>
              Already Have account? &nbsp;
              <NavLink to="/signin">signin</NavLink>
            </Col>
          </Row>
        </Form>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Signup;
