import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import LazyLoading from "../Lazy/LazyLoading";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const BoxPop = ({
  popIt,
  setBox,
  data,
  inner,
  name,
  type,
  user,
  isAccount,
  delCom,
  handChange2,
  handPost2,
  popPost2,
}) => {
  return (
    <Wrapper style={{ display: popIt ? "flex" : "none" }}>
      <div className="popbox">
        {type === "like" ? (
          <div className="likewrap">
            <p className="liketop">{name}</p>
            {data?.map((val, i) => {
              return (
                <div key={i} className="innerLikes">
                  <div key={i} className="mainpostsec">
                    <div className="leftpost">
                      <LazyLoading src={val?.avatar?.url} />
                      <p>{val?.name}</p>
                    </div>
                    <span>Follow</span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="comwrap">
            <p className="com2top">Comments</p>
            {inner === "top" ? (
              <div className="inputcom">
                <input
                  type="text"
                  value={popPost2}
                  onChange={handChange2}
                  placeholder="Add Comment"
                />
                <Button
                  onClick={handPost2}
                  variant="primary" // Change this to customize the button color
                  style={{
                    borderRadius: "5px", // Example: set border radius
                    fontSize: "14px", // Example: set font size
                    width: "20%",
                    height: "3rem",
                    display: popPost2.length === 0 ? "none" : "block",
                  }}
                >
                  Post
                </Button>
              </div>
            ) : (
              ""
            )}
            {data?.map((val, i) => {
              return (
                <div key={i} className="innercom2">
                  <div key={i} className="mainpostseccom2">
                    <div className="leftpostcom2">
                      <LazyLoading src={val?.user?.avatar?.url} />
                      <p>{val?.user?.name}</p>
                    </div>
                    <span>{val?.comment}</span>
                    {isAccount || val.user?._id === user ? (
                      <MdDeleteOutline
                        onClick={() => delCom(val?._id)}
                        style={{
                          fontSize: "2rem",
                          color: "red",
                          cursor: "pointer",
                        }}
                      />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <IoMdClose className="popclose" onClick={() => setBox(false)} />
    </Wrapper>
  );
};

export default BoxPop;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #0000006f;
  z-index: 99999999999999999999;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;

  .popclose {
    font-size: 2.5rem;
    color: #ffffff;
    position: fixed;
    top: 2rem;
    right: 2rem;
    cursor: pointer;
  }

  .popbox {
    width: 30%;
    height: 80%;
    background-color: #424141;
    border-radius: 0.4rem;
    overflow-y: auto;

    .comwrap {
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
    }

    .likewrap {
      .liketop {
        font-size: 2rem;
        text-align: center;
        margin-top: 1rem;
      }

      .innerLikes {
        margin: 0rem 3rem;
        .mainpostsec {
          display: flex;
          width: 100%;
          justify-content: space-between;
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
              cursor: default;
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
              width: fit-content;
              overflow: hidden;
              max-width: 10rem;
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
    }
  }
`;
