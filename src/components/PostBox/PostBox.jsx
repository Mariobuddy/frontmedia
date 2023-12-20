import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
// import { MdDeleteOutline } from "react-icons/md";
import LazyLoading from "../Lazy/LazyLoading";
import { FiMessageCircle } from "react-icons/fi";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHeart } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchpost } from "../../redux/reducers/post";
import { FaRegHeart } from "react-icons/fa";
import { base_url_front } from "../Base_Url/Base_Url";

const PostBox = ({
  postId,
  caption,
  postImage,
  likes,
  comment,
  ownerImage,
  ownerName,
  ownerId,
  isDelete,
  isAccount,
  user,
}) => {
  const [heart, setHeart] = useState(false);

  const dispatch = useDispatch();

  const handHeart = async () => {
    setHeart(!heart);
    try {
      await fetch(`${base_url_front}/post/likeunlike/${postId}`, {
        method: "GET",
        credentials: "include",
      });
    } catch (error) {
      return error;
    }
    dispatch(fetchpost());
  };

  useEffect(() => {
    likes.forEach((val) => {
      if (val._id === user) {
        setHeart(true);
      }
    });
  }, [likes, user]);

  const handViewCom = () => {};

  const handLikes = () => {};
  return (
    <Wrapper>
      <div className="userpost">
        <div className="userimage">
          <LazyLoading src={ownerImage} />
        </div>
        <div className="username">
          <NavLink className={"own-Nav"} to={`/${ownerId}`}>
            <p>{ownerName}</p>
          </NavLink>
        </div>
      </div>
      <LazyLoading src={postImage} />
      <div className="useraction">
        {heart ? (
          <FaHeart className="posticon" style={{color:"red"}} onClick={handHeart} />
        ) : (
          <FaRegHeart
            className="posticon"
            onClick={handHeart}
            style={{ color: "#FFFFFF" }}
          />
        )}
        <FiMessageCircle className="posticon" />
      </div>
      <span className="userlikes" onClick={handLikes}>
        {likes.length} {likes.length <= 1 ? "Like" : "likes"}
      </span>
      <span className="usercaption">
        <span>{ownerName}</span> {caption}
      </span>
      <span className="viewcom" onClick={handViewCom}>
        View all {comment.length} {comment.length <= 1 ? "Comment" : "Comments"}
      </span>
      <span className="firstcom">
        <span>{comment[0]?.user?.name}</span>
        {comment[0]?.comment}
      </span>
      <div className="inputcom">
        <input type="text" placeholder="Add Comment" />
        <Button
          variant="primary" // Change this to customize the button color
          style={{
            borderRadius: "5px", // Example: set border radius
            fontSize: "14px", // Example: set font size
            width: "10%",
            height: "3rem",
          }}
          // onClick={handSubmit}
        >
          Post
        </Button>
      </div>
    </Wrapper>
  );
};

export default PostBox;

const floatAnimation = keyframes`
 0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-3px); /* Adjust the value as needed */
  }

`;

const Wrapper = styled.div`
  .likesPop {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: green;
  }
  width: 100%;
  height: 60rem;
  border: 2px solid gray;
  padding: 2rem 0rem;
  color: #ffffff;
  margin-bottom: 4rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  .lazy-load-image-background {
    width: 90%;
    height: 60%;
    margin-right: 0.8rem;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .userpost {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 90%;
    font-size: 1.6rem;
    .userimage {
      .lazy-load-image-background {
        width: 4rem;
        height: 4rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: 50%;
        }
      }
    }
    .username {
      margin-left: 0.5rem;
      .own-Nav {
        text-decoration: none;
        color: #ffffff;
      }
    }
  }
  .useraction {
    width: 90%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .posticon {
      font-size: 2.5rem;
      margin-right: 1.5rem;
      cursor: pointer;
      transition: transform 1s ease;

      &:hover {
        animation: ${floatAnimation} 0.3s ease;
        transform: translateY(-3px);
      }
    }
  }
  .userlikes {
    width: 90%;
    font-size: 1.4rem;
    cursor: pointer;
  }
  .usercaption {
    width: 90%;
    font-size: 1.2rem;
    span {
      font-size: 1.5rem;
      margin-right: 1rem;
    }
  }
  .viewcom {
    width: 90%;
    font-size: 1.4rem;
    cursor: pointer;
  }
  .firstcom {
    width: 90%;
    font-size: 1.2rem;
    span {
      font-size: 1.5rem;
      margin-right: 1rem;
    }
  }

  .inputcom {
    width: 90%;
    border-bottom: 2px solid gray;

    input {
      border: none;
      outline: none;
      height: 4rem;
      background-color: transparent;
      width: 90%;
      color: #ffffff;
      font-size: 1.4rem;
    }
  }
`;
