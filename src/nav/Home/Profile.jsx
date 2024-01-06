import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSinglePostLoading } from "../../redux/reducers/authorized";
import { fetchAuth } from "../../redux/reducers/authorized";
import styled from "styled-components";
import LazyLoading from "../../components/Lazy/LazyLoading";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PostBox from "../../components/PostBox/PostBox";
import BoxPop from "../../components/BoxPop/BoxPop";

const Profile = () => {
  const dispatch = useDispatch();
  const [popBox, setPopBox] = useState(false);
  const [popBoxFoll, setPopBoxFoll] = useState(false);

  const { singlePostSucess, authSucess } = useSelector(
    (state) => state.authorized
  );

  useEffect(() => {
    dispatch(fetchSinglePostLoading());
    dispatch(fetchAuth());
  }, [dispatch]);
  return (
    <Wrapper>
      <BoxPop popIt={popBox} type={"like"} data={authSucess.followers} setBox={setPopBox} name={"Followers"}/>
      <BoxPop popIt={popBoxFoll} type={"like"} data={authSucess.following} setBox={setPopBoxFoll} name={"Following"}/>
      <div className="profile-left">
        <div className="profile-toppost">
          {singlePostSucess?.map((val, i) => {
            return (
              <PostBox
                key={i}
                postId={val._id}
                postImage={val?.image?.url}
                caption={val?.caption}
                comment={val?.comment}
                likes={val?.likes}
                ownerId={val?.owner?._id}
                ownerName={val?.owner?.name}
                ownerImage={val?.owner?.avatar?.url}
                user={authSucess?._id}
                isAccount={true}
                isDelete={true}
              />
            );
          })}
        </div>
      </div>
      <div className="profile-right">
        <div className="profile-image-div">
          <LazyLoading src={authSucess?.avatar?.url} />
          <span style={{ fontSize: "2rem" }}>{authSucess.name}</span>
        </div>
        <div className="profile-image-div">
          <span onClick={() => setPopBox(true)}>Followers</span>
          <span>{authSucess.followers?.length}</span>
        </div>
        <div className="profile-image-div">
          <span onClick={() => setPopBoxFoll(true)}>Following</span>
          <span>{authSucess?.following?.length}</span>
        </div>
        <div className="profile-image-div">
          <span style={{ cursor: "default" }}>Posts</span>
          <span>{authSucess?.posts?.length}</span>
        </div>
        <Button
          variant="danger" // Change this to customize the button color
          style={{
            borderRadius: "5px", // Example: set border radius
            fontSize: "14px", // Example: set font size
            width: "30%",
            height: "3.5rem",
          }}
          // onClick={handSubmit}
        >
          Log out
        </Button>
        <Button
          variant="success" // Change this to customize the button color
          style={{
            borderRadius: "5px", // Example: set border radius
            fontSize: "14px", // Example: set font size
            width: "fit-content",
            height: "3.5rem",
            padding: "0px 30px",
          }}
          // onClick={handSubmit}
        >
          Edit Profile
        </Button>
        <Button
          variant="primary" // Change this to customize the button color
          style={{
            borderRadius: "5px", // Example: set border radius
            fontSize: "14px", // Example: set font size
            width: "fit-content",
            height: "3.5rem",
            padding: "0px 30px",
          }}
          // onClick={handSubmit}
        >
          Change Password
        </Button>
      </div>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div`
  color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .profile-left {
    width: 70%;
    min-height: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .profile-toppost {
      width: 80%;
      height: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }

  .profile-right {
    width: 30%;
    height: 100%;
    background-color: #424141;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .profile-image-div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      span {
        font-size: 1.4rem;

        &:nth-child(1) {
          cursor: pointer;
          font-size: 1.6rem;
        }
      }
      .lazy-load-image-background {
        width: 12rem;
        height: 12rem;
        margin-bottom: 2rem;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          border-radius: 50%;
        }
      }
    }
  }
`;
