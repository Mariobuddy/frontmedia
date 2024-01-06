import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import LazyLoading from "../../components/Lazy/LazyLoading";
import { fetchAuth } from "../../redux/reducers/authorized";
import { CgAddR } from "react-icons/cg";
import { IoSearch } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { BiMessageRounded } from "react-icons/bi";

const Home = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { authSucess } = useSelector((state) => state.authorized);
  const [size, setSize] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let resizeRes = () => {
      if (window.innerWidth <= 768) {
        setSize(true);
      } else {
        setSize(false);
      }
    };
    window.addEventListener("resize", resizeRes);
    return () => {
      window.removeEventListener("resize", resizeRes);
    };
  }, []);

  let Toggle = () => {
    setShow(!show);
  };

  const handnav = () => {
    setShow(false);
  };

  useEffect(() => {
    dispatch(fetchAuth());
  }, [dispatch]);
  return (
    <Wrapper>
      <div
        className="left"
        style={{
          display: show || (window.innerWidth > 768 && !size) ? "flex" : "none",
        }}
      >
        <div className="link">
          <p>Mario Media</p>
          <NavLink
            className={
              location.pathname === "/home" ||
              location.pathname === "/home/postsection"
                ? "navOne active"
                : "navOne"
            }
            to={"postsection"}
            onClick={() => handnav("/home/postsection")}
          >
            <div className="in">
              <IoMdHome className="icon" />
              Home
            </div>
          </NavLink>
          <NavLink
            className={"navOne"}
            to={"search"}
            onClick={() => handnav("/home/search")}
          >
            <div className="in">
              <IoSearch className="icon" />
              Search
            </div>
          </NavLink>
          <NavLink
            className={"navOne"}
            to={"message"}
            onClick={() => handnav("/home/message")}
          >
            <div className="in">
              <BiMessageRounded className="icon" />
              Messages
            </div>
          </NavLink>
          <NavLink
            className={"navOne"}
            to={"createpost"}
            onClick={() => handnav("/home/createpost")}
          >
            <div className="in">
              <CgAddR className="icon" /> Create
            </div>
          </NavLink>
          <NavLink
            className={"navOne"}
            to={"profile"}
            onClick={() => handnav("/home/profile")}
          >
            <div className="in">
              <LazyLoading src={authSucess?.avatar?.url} />
              Profile
            </div>
          </NavLink>
        </div>
      </div>
      <div className="mobile">
        {show ? (
          <AiOutlineClose className="logo1" onClick={Toggle} />
        ) : (
          <GiHamburgerMenu className="logo1" onClick={Toggle} />
        )}
      </div>
      <div className="right">
        <Outlet />
      </div>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
  z-index: 999;
  position: absolute;
  background-color: black;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  .mobile {
    display: none;
  }

  .active {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 0.4rem;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    color: #ffffff !important;
  }

  .back {
    display: none;
  }

  .right {
    width: 84vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 16vw;
  }

  .left {
    padding: 2rem;
    width: 16vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 40000;
    border-right: 1px solid #505050;
    background-color: black;

    .link {
      display: flex;
      flex-direction: column;

      p {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #ffffff;
        font-size: 4rem;
        text-align: center;
        margin-bottom: 3rem;
        font-weight: bold;
        font-family: "Rouge Script", cursive;
      }

      .navOne {
        color: #b7b2b2;
        font-size: 1.5rem;
        margin: 1rem 0rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-radius: 0.4rem;
        text-decoration: none;

        .in {
          display: flex;
          justify-content: center;
          align-items: center;
          .lazy-load-image-background {
            width: 3rem;
            height: 3rem;
            margin-right: 0.8rem;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
              border-radius: 50%;
            }
          }
          .icon {
            font-size: 2.5rem;
            margin-right: 0.5rem;
          }
        }

        .arrow {
          color: #ffffff;
          font-size: 1.6rem;
        }
      }
    }

    .profile {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0.6rem 0.5rem;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 0.4rem;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      margin-left: -1.3rem;
      width: 15vw;

      .down-arrow {
        font-size: 2.5rem;
        color: #b7b2b2;
      }

      .inner-profile {
        display: flex;
        color: #b7b2b2;
        justify-content: center;
        align-items: center;

        .name-div {
          margin-left: 0.8rem;
          p {
            font-size: 1rem;
            &:nth-child(1) {
              color: #ffffff;
            }
          }
        }

        img {
          width: 3.2rem;
          height: 3.2rem;
          border-radius: 50%;
        }
      }
    }
  }

  @media (min-width: 360px) and (max-width: 768px) {
    .mobile {
      display: inline-flex;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      margin-left: 0rem;
      position: fixed;
      top: -36rem;
      z-index: 99999999;
      right: 1rem;

      .logo1 {
        cursor: pointer;
        font-size: 3rem;
        color: orangered;
      }
    }
    .right {
      width: 100vw;
      height: 100%;
      flex-direction: column;
      margin-left: 0;
    }

    .left {
      background-color: #03002e;
      padding: 2rem;
      width: 100%;
      height: fit-content;
      display: none;

      .profile {
        margin-left: 0rem;
        width: 100%;
        margin-top: 10rem;
      }
    }
  }
`;
