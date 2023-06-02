import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [details, setDetails] = useState([
    {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
  ]);

  const [loginId, setLoginId] = useState(0);

  const clickHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/create/person", details);
      //   navigate("/home");
    } catch (err) {
      console.log("error: " + err);
    }
  };


  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/login", details);
      // const res = await axios.get("http://localhost:8081/person");
      console.log('this is login data',res.data.results.user[0].id);
      


      navigate(`/home/${res.data.results.user[0].id}`);
    } catch (err) {
      console.log("error: " + err);
    }
  };

 

  const changeHandler = (event) => {
    event.preventDefault();
    try {
      setDetails((prev) => ({
        ...prev,
        [event.target.name]: event.target.value,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="form1"
            type="email"
            name="email"
            onChange={changeHandler}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form1"
            type="password"
            name="password"
            onChange={changeHandler}
          />

          <MDBBtn className="mb-4 w-100" onClick={loginHandler}>
            Sign in
          </MDBBtn>
          <p className="text-center">
            Not a member?{" "}
            <a href="#!" onClick={() => handleJustifyClick("tab2")}>
              Register
            </a>
          </p>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <MDBInput
            wrapperClass="mb-4"
            label="Name"
            id="form1"
            type="text"
            name="name"
            onChange={changeHandler}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Phone"
            id="form1"
            type="text"
            name="phone"
            onChange={changeHandler}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Email"
            id="form1"
            type="email"
            name="email"
            onChange={changeHandler}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form1"
            type="password"
            name="password"
            onChange={changeHandler}
          />

          <MDBBtn className="mb-4 w-100" onClick={clickHandler}>
            Sign up
          </MDBBtn>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
}

export default Login;
