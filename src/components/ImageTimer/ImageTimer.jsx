import React, { useState, useEffect } from "react";
import LazyLoading from "../Lazy/LazyLoading";
import styled from "styled-components";
import Rohit from "../../assests/main.jpg";
import Rohit1 from "../../assests/main2.jpg";

const ImageTimer = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [Rohit, Rohit1]; // Add your image URLs

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [currentImageIndex, images.length]);
  return (
    <Wrapper>
      <LazyLoading src={images[currentImageIndex]} />
    </Wrapper>
  );
};

export default ImageTimer;

const Wrapper = styled.div`
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
`;
