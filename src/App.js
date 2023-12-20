import React, { lazy, Suspense, useState, useEffect } from "react";
import styled from "styled-components";
import ProtectedRoutes from "./components/Protected Routes/ProtectedRoutes";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
const LazyLogin = lazy(() => import("./nav/Login/Login"));
const LazyHome = lazy(() => import("./nav/Home/Home"));
const LazyPostSection = lazy(() => import("./nav/Home/PostSection"));
const LazyCreate = lazy(() => import("./nav/Home/CreatePost"));
const LazySearch = lazy(() => import("./nav/Home/Search"));
const LazyProfile = lazy(() => import("./nav/Home/Profile"));
const LazyMessage = lazy(() => import("./nav/Home/Message"));
const LazyRegistration = lazy(() => import("./nav/Registration/Registraton"));

const App = () => {
  const { isAuth } = useSelector((state) => state.authorized);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the threshold as needed
    };

    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);
  return (
    <Wrapper>
      <div className="invis">
        <ToastContainer
          position={isMobile ? "top-center" : "bottom-right"}
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggables
          pauseOnHover
          theme="dark"
        />
      </div>
      <Router>
        <Routes>
          {/* -----------------------------------Protected Routes--------------------------------------- */}

          <Route
            path="/home"
            element={
              <ProtectedRoutes isAuth={isAuth}>
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loader />
                    </div>
                  }
                >
                  <LazyHome />
                </Suspense>
              </ProtectedRoutes>
            }
          >
            <Route
              index
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loader />
                    </div>
                  }
                >
                  <LazyPostSection />
                </Suspense>
              }
            />
            <Route
              exact
              path="postsection"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loader />
                    </div>
                  }
                >
                  <LazyPostSection />
                </Suspense>
              }
            />
            <Route
              exact
              path="createpost"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loader />
                    </div>
                  }
                >
                  <LazyCreate />
                </Suspense>
              }
            />
            <Route
              exact
              path="profile"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loader />
                    </div>
                  }
                >
                  <LazyProfile />
                </Suspense>
              }
            />
            <Route
              exact
              path="message"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loader />
                    </div>
                  }
                >
                  <LazyMessage />
                </Suspense>
              }
            />
            <Route
              exact
              path="search"
              element={
                <Suspense
                  fallback={
                    <div className="cirDiv">
                      <Loader />
                    </div>
                  }
                >
                  <LazySearch />
                </Suspense>
              }
            />
          </Route>

          {/* -----------------------------------Protected Routes End------------------------------------ */}

          <Route
            exact
            path="/"
            element={
              <Suspense
                fallback={
                  <div className="cirDiv">
                    <Loader />
                  </div>
                }
              >
                <LazyLogin />
              </Suspense>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <Suspense
                fallback={
                  <div className="cirDiv">
                    <Loader />
                  </div>
                }
              >
                <LazyRegistration />
              </Suspense>
            }
          />
        </Routes>
      </Router>
    </Wrapper>
  );
};

export default App;

const Wrapper = styled.div`
  min-height: 100vh;
  .cirDiv {
    position: absolute;
    top: 45%;
    left: 50%;
  }
  .invis {
    position: absolute;
    z-index: 99999999999999999999;
  }
  @media (min-width: 350px) and (max-width: 768px) {
    .invis {
      position: fixed;
    }
    .cirDiv {
      position: absolute;
      top: 45%;
      left: 40%;
    }
  }
`;
