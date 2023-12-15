import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Home = () => {
  const { isAuth } = useSelector((state) => state.authorized);
  console.log(isAuth);
  return <Wrapper></Wrapper>;
};

export default Home;

const Wrapper = styled.div``;
