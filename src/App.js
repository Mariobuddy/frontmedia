import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./components/Loader/Loader";
const LazyLogin = lazy(() => import("./nav/Login/Login"));
const LazyRegistration = lazy(() => import("./nav/Registration/Registraton"));

const App = () => {
  return (
    <Wrapper>
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
`;
