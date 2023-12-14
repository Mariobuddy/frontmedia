import React, { lazy, Suspense, useState, useEffect } from "react";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
const LazyLogin = lazy(() => import("./nav/Login/Login"));
const LazyRegistration = lazy(() => import("./nav/Registration/Registraton"));

const App = () => {
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
          <Route
            exact
            path="/login"
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
  height: 100%;
  width: 100%;
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
