import React, { useEffect } from "react";
import styled from "styled-components";
import PostBox from "../../components/PostBox/PostBox";
import { useSelector, useDispatch } from "react-redux";
import { fetchpost } from "../../redux/reducers/post";
import { fetchAllUsers } from "../../redux/reducers/allUsers";
import LazyLoading from "../../components/Lazy/LazyLoading";
import { fetchAuth } from "../../redux/reducers/authorized";

const PostSection = () => {
  const dispatch = useDispatch();
  const { postSucess } = useSelector((state) => state.post);
  const { allUsersSucess } = useSelector((state) => state.allusers);
  const { authSucess } = useSelector((state) => state.authorized);
  useEffect(() => {
    dispatch(fetchpost());
    dispatch(fetchAllUsers());
    dispatch(fetchAuth());
  }, [dispatch]);
  return (
    <Wrapper>
      <div className="toppost">
        {postSucess?.map((val, i) => {
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
            />
          );
        })}
      </div>
      <div className="bottompost">
        <div className="sugDiv">
          <p>Suggested for you</p>
          <p>View all</p>
        </div>
        {allUsersSucess.map((val, i) => {
          return (
            <div key={i} className="mainpostsec">
              <div className="leftpost">
                <LazyLoading src={val?.avatar?.url} />
                <p>{val?.name}</p>
              </div>
              <span>Follow</span>
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default PostSection;

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-around;
  background-color: black;
  .toppost {
    width: 60%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .bottompost {
    .sugDiv {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      p {
        text-align: center;
        color: var(--dimgray);
        font-size: 1.4rem;
        margin-top: 1rem;

        &:nth-child(2) {
          color: #ffffff;
        }
      }
    }
    width: 30%;
    height: 50rem;
    border: 2px solid gray;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    .mainpostsec {
      display: flex;
      width: 100%;
      justify-content: space-around;
      margin: 1rem 0rem;
      align-items: center;
      font-size: 1.2rem;
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
`;
