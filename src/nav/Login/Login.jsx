import React, { useState, useRef } from "react";
import styled from "styled-components";
import Mobile from "../../assests/mobile.png";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageTimer from "../../components/ImageTimer/ImageTimer";
import Loader from "../../components/Loader/Loader";
import { NavLink } from "react-router-dom";
import { base_url_front } from "./../../components/Base_Url/Base_Url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getToken } from "../../redux/reducers/authorized";

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loadCir, setLoadCir] = useState(true);
  let [errors, setErrors] = useState({});
  let emailSpan = useRef("");
  let passwordSpan = useRef("");
  let Inp = useRef("");

  let validationForm = () => {
    const newErrors = {};
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      emailSpan.current.style.color = "red";
      emailSpan.current.textContent = newErrors.email;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
      emailSpan.current.style.color = "red";
      emailSpan.current.textContent = newErrors.email;
    } else {
      emailSpan.current.style.color = "#7c7e80";
      emailSpan.current.textContent = "Enter Your Email";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
      passwordSpan.current.style.color = "red";
      passwordSpan.current.textContent = newErrors.password;
    } else if (formData.password.length < 6) {
      newErrors.password = "More than 6 characters required";
      passwordSpan.current.textContent = newErrors.password;
      passwordSpan.current.style.color = "red";
    } else {
      passwordSpan.current.style.color = "#7c7e80";
      passwordSpan.current.textContent = "Enter Your Password";
    }
    errors = newErrors;
    setErrors(errors);
    return Object.keys(newErrors).length === 0;
  };

  const handChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setFormData({ ...formData, [name]: value });
  };
  const handFocus = (type) => {
    if (type === "email") {
      emailSpan.current.style.top = "-1rem";
    } else {
      passwordSpan.current.style.top = "-1rem";
    }
  };

  const handBlur = (type) => {
    if (type === "email") {
      if (formData.email.length === 0) {
        emailSpan.current.style.top = "0.8rem";
      }
    } else {
      if (formData.password.length === 0) {
        passwordSpan.current.style.top = "0.8rem";
      }
    }
  };
  const handSubmit = async (e) => {
    e.preventDefault();
    if (validationForm()) {
      setLoadCir(false);
      try {
        const res = await fetch(`${base_url_front}/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (res.status === 200) {
          localStorage.setItem("jwt", data.token);
          dispatch(getToken());
          nav("/home");
          setFormData({
            password: "",
            email: "",
          });
          setLoadCir(true);
          toast("Login SucessFull");
        } else if (
          data.message === "Email not found" ||
          data.message === "Password does not match" ||
          data.message === "Email and password are required" ||
          data.message === "Internal server error"
        ) {
          toast(data.message);
          setLoadCir(true);
        }
      } catch (error) {
        return error;
      }
    }
  };
  return (
    <Wrapper>
      <div className="img-Div">
        <ImageTimer />
        <img src={Mobile} className="mobside" alt="icon" />
      </div>
      <div className="login-Div">
        <div className="login-top">
          <p>Mario Media</p>
          <form action="" method="post">
            <div className="login-out">
              <span ref={emailSpan}>Enter Your Email</span>
              <input
                onFocus={() => handFocus("email")}
                onBlur={() => handBlur("email")}
                type="text"
                autoComplete="off"
                name="email"
                onChange={handChange}
                value={formData.email}
                ref={Inp}
              />
            </div>
            <div className="login-out">
              <span ref={passwordSpan}>Enter Your Password</span>
              <input
                type="password"
                onFocus={() => handFocus("password")}
                onBlur={() => handBlur("password")}
                autoComplete="off"
                name="password"
                onChange={handChange}
                ref={Inp}
                value={formData.password}
              />
            </div>
            <Button
              variant="primary" // Change this to customize the button color
              style={{
                borderRadius: "5px", // Example: set border radius
                fontSize: "14px", // Example: set font size
                width: "90%",
                height: "3.5rem",
              }}
              onClick={handSubmit}
            >
              Log in
            </Button>
          </form>
          <span
            style={{
              display: loadCir ? "none" : "block",
              position: "absolute",
              bottom: "3rem",
            }}
          >
            <Loader />
          </span>
          <button className="login-button">Forgot password?</button>
        </div>
        <div className="login-bottom">
          <span>
            Don't have an account?{" "}
            <NavLink to={"/register"}>
              <button className="login-dont"> Sign up</button>
            </NavLink>
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .img-Div {
    position: relative;
    .mobside {
      width: 50rem;
      height: 50rem;
    }
    .lazy-load-image-background {
      position: absolute;
      top: 8%;
      left: 29.5%;
      z-index: -2;
      width: 20.5rem;
      height: 42rem;
      margin-right: 0.5rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        margin-right: 0.5rem;
      }
    }
  }

  .login-Div {
    width: 32rem;
    height: 45rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .login-bottom {
      border: 2px solid var(--dimgray);
      width: 100%;
      height: 8rem;
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 1.3rem;
        .login-dont {
          background-color: transparent;
          border: none;
          outline: none;
          cursor: pointer;
          color: #2777d2;
          font-weight: 500;
        }
      }
    }

    .login-top {
      width: 100%;
      height: 100%;
      border: 2px solid var(--dimgray);
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;
      position: relative;

      > p {
        font-family: "Rouge Script", cursive;
        font-size: 5rem;
        font-weight: 700;
        margin: 2rem 0rem;
      }

      form {
        width: 100%;
        height: fit-content;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .login-out {
          width: 90%;
          height: 4rem;
          border: 2px solid var(--dimgray);
          margin-bottom: 2rem;
          display: flex;
          justify-content: flex-start;
          padding-left: 2rem;
          align-items: center;
          position: relative;
          span {
            color: #7c7e80;
            font-size: 1.3rem;
            position: absolute;
            transition: top 0.2s ease;
            z-index: 2;
            top: -1rem;
          }
          input {
            width: 100%;
            height: 100%;
            border: none;
            outline: none;
            font-size: 1.2rem;
            z-index: 4;
            background-color: transparent;
          }
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            transition: background-color 5000s ease-in-out 0s;
          }
        }
      }
      .login-button {
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 1.3rem;
        color: #2777d2;
      }
    }
  }
`;
