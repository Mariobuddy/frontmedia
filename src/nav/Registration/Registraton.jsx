import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Loader from "../../components/Loader/Loader";
import { NavLink } from "react-router-dom";
import { AiFillCamera } from "react-icons/ai";
import Rohit from "../../assests/profile.jpeg";
import BaseImg from "../../components/Base64/BaseImg";
import { toast } from "react-toastify";
import { base_url_front } from "./../../components/Base_Url/Base_Url";
import { useNavigate } from "react-router-dom";

const Registraton = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    surname: "",
    name: "",
    cpassword: "",
    avatar: "",
  });
  const [loadCir, setLoadCir] = useState(true);
  let [errors, setErrors] = useState({});
  let emailSpan = useRef("");
  let passwordSpan = useRef("");
  let nameSpan = useRef("");
  let surnameSpan = useRef("");
  let cpasswordSpan = useRef("");
  let Inp = useRef("");

  useEffect(() => {
    if (Inp.current.length === undefined) {
      passwordSpan.current.style.top = "-1rem";
      emailSpan.current.style.top = "-1rem";
      cpasswordSpan.current.style.top = "-1rem";
      nameSpan.current.style.top = "-1rem";
      surnameSpan.current.style.top = "-1rem";
    }
  }, []);

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
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      nameSpan.current.textContent = newErrors.name;
      nameSpan.current.style.color = "red";
    } else if (formData.name.length < 3) {
      newErrors.name = "More than 3 characters required";
      nameSpan.current.textContent = newErrors.name;
      nameSpan.current.style.color = "red";
    } else {
      nameSpan.current.style.color = "#7c7e80";
      nameSpan.current.textContent = "Enter Your Name";
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "Surname is required";
      surnameSpan.current.textContent = newErrors.surname;
      surnameSpan.current.style.color = "red";
    } else if (formData.surname.length < 3) {
      newErrors.surname = "More than 3 characters required";
      surnameSpan.current.textContent = newErrors.surname;
      surnameSpan.current.style.color = "red";
    } else {
      passwordSpan.current.style.color = "#7c7e80";
      passwordSpan.current.textContent = "Enter Your Surname";
    }
    if (!formData.cpassword.trim()) {
      newErrors.cpassword = "Confirm Your Password";
      cpasswordSpan.current.textContent = newErrors.cpassword;
      cpasswordSpan.current.style.color = "red";
    } else if (formData.password !== formData.cpassword) {
      newErrors.cpassword = "Password is not matching";
      cpasswordSpan.current.textContent = newErrors.cpassword;
      cpasswordSpan.current.style.color = "red";
    } else {
      cpasswordSpan.current.style.color = "#7c7e80";
      cpasswordSpan.current.textContent = "Confirm Your Password";
    }
    if (!formData.avatar) {
      newErrors.avatar = "Please upload image";
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
    } else if (type === "password") {
      passwordSpan.current.style.top = "-1rem";
    } else if (type === "cpassword") {
      cpasswordSpan.current.style.top = "-1rem";
    } else if (type === "name") {
      nameSpan.current.style.top = "-1rem";
    } else if (type === "surname") {
      surnameSpan.current.style.top = "-1rem";
    }
  };

  const handBlur = (type) => {
    if (type === "email") {
      if (formData.email.length === 0) {
        emailSpan.current.style.top = "0.8rem";
      }
    } else if (type === "password") {
      if (formData.password.length === 0) {
        passwordSpan.current.style.top = "0.8rem";
      }
    } else if (type === "cpassword") {
      if (formData.cpassword.length === 0) {
        cpasswordSpan.current.style.top = "0.8rem";
      }
    } else if (type === "name") {
      if (formData.name.length === 0) {
        nameSpan.current.style.top = "0.8rem";
      }
    } else if (type === "surname") {
      if (formData.surname.length === 0) {
        surnameSpan.current.style.top = "0.8rem";
      }
    }
  };
  const handSubmit = async (e) => {
    e.preventDefault();
    if (validationForm()) {
      setLoadCir(false);
      try {
        const res = await fetch(`${base_url_front}/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });

        const data = await res.json();

        if (res.status === 200) {
          setLoadCir(true);
          toast("Registration Sucessfull");
          navigate("/login");
          setFormData({
            name: "",
            surname: "",
            password: "",
            cpassword: "",
            email: "",
            avatar: null,
          });
        } else if (
          data.message === "Email already exists" ||
          data.message === "All fields are required" ||
          data.message === "Passwords do not match" ||
          data.message === "Internal server error"
        ) {
          setLoadCir(true);
          toast(data.message);
        }
      } catch (error) {
        return error;
      }
    }
  };
  let handleProfile = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let data = await BaseImg(file);
      setFormData({ ...formData, avatar: data });
    }
  };

  return (
    <Wrapper>
      <div className="login-Div">
        <div className="login-top">
          <p>Mario Media</p>
          <form action="" method="post">
            <div
              className="profileDiv"
              style={{
                border: errors.avatar ? "3px solid red" : "3px solid gray",
              }}
            >
              <img
                alt="img"
                src={formData.avatar ? formData.avatar : Rohit}
                className="profile"
              />
            </div>
            <label htmlFor="profileLab">
              <AiFillCamera className="up" />
              <input
                id="profileLab"
                onChange={handleProfile}
                style={{ display: "none" }}
                type="file"
                accept="image/*"
              />
            </label>
            <div className="login-out">
              <span ref={nameSpan}>Enter Your Name</span>
              <input
                type="text"
                onFocus={() => handFocus("name")}
                onBlur={() => handBlur("name")}
                autoComplete="off"
                name="name"
                onChange={handChange}
                ref={Inp}
                value={formData.name}
              />
            </div>
            <div className="login-out">
              <span ref={surnameSpan}>Enter Your Surname</span>
              <input
                type="text"
                onFocus={() => handFocus("surname")}
                onBlur={() => handBlur("surname")}
                autoComplete="off"
                name="surname"
                onChange={handChange}
                ref={Inp}
                value={formData.surname}
              />
            </div>
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
            <div className="login-out">
              <span ref={cpasswordSpan}>Confirm Your Password</span>
              <input
                type="password"
                onFocus={() => handFocus("cpassword")}
                onBlur={() => handBlur("cpassword")}
                autoComplete="off"
                name="cpassword"
                onChange={handChange}
                ref={Inp}
                value={formData.cpassword}
              />
            </div>
            <div className="login-out">
              <span ref={cpasswordSpan}>Enter Your Otp</span>
              <input
                type="text"
                onFocus={() => handFocus("otp")}
                onBlur={() => handBlur("otp")}
                autoComplete="off"
                name="otp"
                onChange={handChange}
                ref={Inp}
                value={formData.cpassword}
              />
            </div>
            <p className="plogin">
              People who use our service may have uploaded your contact
              information to Mario Media .{" "}
            </p>
            <p className="plogin">
              By signing up, you agree to our Terms , Privacy Policy and Cookies
              Policy .
            </p>
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
              Sign up
            </Button>
          </form>
          <span
            style={{
              display: loadCir ? "none" : "block",
              position: "absolute",
              bottom: "4rem",
            }}
          >
            <Loader />
          </span>
        </div>
        <div className="login-bottom">
          <span>
            Have an account?{" "}
            <NavLink to={"/login"}>
              <button className="login-dont"> Log in</button>
            </NavLink>
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default Registraton;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-Div {
    width: 35rem;
    height: 70rem;
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
      padding: 2rem 0rem;

      > p {
        font-family: "Rouge Script", cursive;
        font-size: 5rem;
        font-weight: 700;
        margin: 2rem 0rem;
      }

      form {
        position: relative;
        label {
          .up {
            font-size: 2.5rem;
            position: absolute;
            top: 1.5rem;
            left: 46.5%;
            color: #ffffffd6;
            cursor: pointer;
          }
        }
        .profileDiv {
          border-radius: 50%;
          margin-bottom: 1rem;
          width: 5rem;
          height: 5rem;
          border: 3px solid gray;
          position: relative;
          overflow: hidden;
          .profile {
            border-radius: 50%;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }
        }
        .plogin {
          text-align: center;
        }
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
            top: 0.8rem;
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
