import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { MdDeleteOutline } from "react-icons/md";
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
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { fetchSinglePostLoading } from "../../redux/reducers/authorized";
import BoxPop from "../BoxPop/BoxPop";

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
  const [popPost, setPopPost] = useState("");
  const [popPost2, setPopPost2] = useState("");
  const [closeLikes, setCloseLikes] = useState(false);
  const [closeComment, setCloseComment] = useState(false);
  const [closeComment2, setCloseComment2] = useState(false);

  const dispatch = useDispatch();

  const handHeart = async () => {
    setHeart(!heart);
    try {
      const res = await fetch(`${base_url_front}/post/likeunlike/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (res.status === 200) {
        if (isAccount) {
          dispatch(fetchSinglePostLoading());
        } else {
          dispatch(fetchpost());
        }
      }
    } catch (error) {
      return error;
    }
  };

  const handPost = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${base_url_front}/post/addupdatecomment/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ comment: popPost }),
        }
      );
      if (res.status === 200) {
        if (isAccount) {
          dispatch(fetchSinglePostLoading());
        } else {
          dispatch(fetchpost());
        }
        setPopPost("");
      }
    } catch (error) {
      return error;
    }
  };
  const handPost2 = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${base_url_front}/post/addupdatecomment/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ comment: popPost2 }),
        }
      );
      if (res.status === 200) {
        if (isAccount) {
          dispatch(fetchSinglePostLoading());
        } else {
          dispatch(fetchpost());
        }
        setPopPost2("");
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    likes.forEach((val) => {
      if (val._id === user) {
        setHeart(true);
      }
    });
  }, [likes, user]);

  const reversedData = [...comment].reverse();

  const handViewCom = () => {
    setCloseComment(true);
    setCloseLikes(false);
  };

  const delCom = async (id) => {
    try {
      const res = await fetch(
        `${base_url_front}/post/deletecomment/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ commentId: id }),
        }
      );
      if (res.status === 200) {
        toast("Comment Delete");
        if (isAccount) {
          dispatch(fetchSinglePostLoading());
        } else {
          dispatch(fetchpost());
        }
      }
    } catch (error) {
      return error;
    }
  };

  const handViewCom2 = () => {
    setCloseComment(false);
    setCloseLikes(false);
    setCloseComment2(true);
  };

  const handLikes = () => {
    setCloseComment(false);
    setCloseLikes(true);
  };

  const handChange = (e) => {
    setPopPost(e.target.value);
  };

  const handChange2 = (e) => {
    setPopPost2(e.target.value);
  };

  return (
    <Wrapper>
      <BoxPop
        popIt={closeComment2}
        data={reversedData}
        setBox={setCloseComment2}
        name={reversedData.length <= 1 ? "Comment" : "Comments"}
        type={"comment"}
        user={user}
        isAccount={isAccount}
        delCom={delCom}
        handChange2={handChange2}
        handPost2={handPost2}
        popPost2={popPost2}
        inner={"top"}
      />
      <BoxPop
        popIt={closeComment}
        data={reversedData}
        setBox={setCloseComment}
        name={reversedData.length <= 1 ? "Comment" : "Comments"}
        type={"comment"}
        user={user}
        isAccount={isAccount}
        delCom={delCom}
        handChange2={handChange}
        handPost2={handPost}
        popPost2={popPost}
      />
      <BoxPop
        popIt={closeLikes}
        data={likes}
        setBox={setCloseLikes}
        name={likes.length <= 1 ? "Like" : "Likes"}
        type={"like"}
      />
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
          <FaHeart
            className="posticon"
            style={{ color: "red" }}
            onClick={handHeart}
          />
        ) : (
          <FaRegHeart
            className="posticon"
            onClick={handHeart}
            style={{ color: "#FFFFFF" }}
          />
        )}
        <FiMessageCircle className="posticon" onClick={handViewCom2} />
      </div>
      <span className="userlikes">
        <span onClick={handLikes}>
          {likes.length} {likes.length <= 1 ? "Like" : "likes"}
        </span>
      </span>
      <span className="usercaption">
        <span>{ownerName}</span> {caption}
      </span>
      <span className="viewcom">
        <span onClick={handViewCom}>
          View all {comment.length}{" "}
          {comment.length <= 1 ? "Comment" : "Comments"}
        </span>
      </span>
      <span className="firstcom">
        <span>{comment[comment.length - 1]?.user?.name}</span>
        {comment[comment.length - 1]?.comment}
      </span>
      <div className="inputcom">
        <input
          type="text"
          value={popPost}
          onChange={handChange}
          placeholder="Add Comment"
        />
        <Button
          onClick={handPost}
          variant="primary" // Change this to customize the button color
          style={{
            borderRadius: "5px", // Example: set border radius
            fontSize: "14px", // Example: set font size
            width: "10%",
            height: "3rem",
            display: popPost.length === 0 ? "none" : "block",
          }}
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
    position: fixed;
    z-index: 999999;
    top: 10%;
    left: 40%;
    background-color: #434242;
    width: 30%;
    border-radius: 0.4rem;
    height: 80%;
    overflow: auto;

    .liketop {
      font-size: 2rem;
      text-align: center;
      margin-top: 1rem;
    }

    .innerLikes {
      .mainpostsec {
        display: flex;
        width: 100%;
        justify-content: space-around;
        margin: 2rem 0rem;
        align-items: center;
        font-size: 1.4rem;
        .leftpost {
          display: flex;
          justify-content: center;
          align-items: center;
          .lazy-load-image-background {
            width: 5rem;
            height: 5rem;
            img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: center;
              border-radius: 50%;
            }
          }
          p {
            color: #ffffff;
            margin-left: 1rem;
            cursor: pointer;
            margin-top: 1.2rem;
            width: 10rem;
            overflow: hidden;
          }
        }

        span {
          color: #1f79ff;
          font-size: 1.4rem;
          cursor: pointer;
          height: inherit;
        }
      }
    }

    .ioclose {
      position: absolute;
      font-size: 3rem;
      cursor: pointer;
      right: 1rem;
      top: 1rem;
    }
  }

  .comPop {
    position: fixed;
    z-index: 999999;
    top: 10%;
    left: 40%;
    background-color: #434242;
    width: 30%;
    border-radius: 0.4rem;
    height: 80%;
    overflow: auto;
    padding: 0rem 2rem;

    .comtop {
      font-size: 2rem;
      text-align: center;
      margin-top: 1rem;
    }

    .innercom {
      .mainpostseccom {
        display: flex;
        width: 100%;
        justify-content: flex-start;
        margin: 2rem 0rem;
        align-items: center;
        font-size: 1.2rem;
        .leftpostcom {
          display: flex;
          justify-content: center;
          align-items: center;
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
          p {
            color: #ffffff;
            cursor: pointer;
            margin-top: 1.2rem;
            width: fit-content;
            max-width: 15rem;
            overflow: hidden;
            font-size: 1.4rem;
            margin-right: 0.8rem;
          }
        }

        span {
          color: #d3c9c9;
          font-size: 1.4rem;
          height: inherit;
          width: 80%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .ioclose {
      position: absolute;
      font-size: 3rem;
      cursor: pointer;
      right: 1rem;
      top: 1rem;
    }
  }
  .com2Pop {
    position: fixed;
    z-index: 999999;
    top: 10%;
    left: 40%;
    background-color: #434242;
    width: 30%;
    border-radius: 0.4rem;
    height: 80%;
    overflow: auto;
    padding: 0rem 2rem;

    .inputcom {
      width: 100%;
      border-bottom: 2px solid gray;
      display: flex;
      justify-content: center;
      align-items: center;

      input {
        border: none;
        outline: none;
        height: 4rem;
        background-color: transparent;
        width: 100%;
        color: #ffffff;
        font-size: 1.4rem;
      }
    }

    .com2top {
      font-size: 2rem;
      text-align: center;
      margin-top: 1rem;
    }

    .innercom2 {
      .mainpostseccom2 {
        display: flex;
        width: 100%;
        justify-content: flex-start;
        margin: 2rem 0rem;
        align-items: center;
        font-size: 1.2rem;
        .leftpostcom2 {
          display: flex;
          justify-content: center;
          align-items: center;
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
          p {
            color: #ffffff;
            cursor: pointer;
            margin-top: 1.2rem;
            width: fit-content;
            max-width: 15rem;
            overflow: hidden;
            font-size: 1.4rem;
            margin-right: 0.8rem;
          }
        }

        span {
          color: #d3c9c9;
          font-size: 1.4rem;
          height: inherit;
          width: 80%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }

    .ioclose {
      position: absolute;
      font-size: 3rem;
      cursor: pointer;
      right: 1rem;
      top: 1rem;
    }
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

    span {
      cursor: pointer;
    }
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
    color: #aaa7a7;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    span {
      cursor: pointer;
    }
  }
  .firstcom {
    width: 90%;
    font-size: 1.2rem;
    color: #807c7c;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    span {
      font-size: 1.5rem;
      margin-right: 1rem;
    }
  }

  .inputcom {
    width: 90%;
    border-bottom: 2px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;

    input {
      border: none;
      outline: none;
      height: 4rem;
      background-color: transparent;
      width: 100%;
      color: #ffffff;
      font-size: 1.4rem;
    }
  }
`;
