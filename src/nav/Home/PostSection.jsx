import React, { useEffect } from "react";
import styled from "styled-components";
import PostBox from "../../components/PostBox/PostBox";
import { useSelector, useDispatch } from "react-redux";
import { fetchpost } from "../../redux/reducers/post";

const PostSection = () => {
  const dispatch = useDispatch();
  const { postSucess } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(fetchpost());
  }, [dispatch]);
  return (
    <Wrapper>
      {postSucess?.map((val, i) => {
        return (
          <PostBox
            key={i}
            postId={val._id}
            postImage={val?.image?.url}
            caption={val?.caption}
            comment={val?.likes}
            likes={val?.comment}
            ownerId={val?.owner?._id}
            ownerName={val?.owner?.name}
            ownerImage={val?.owner?.avatar?.url}
          />
        );
      })}
    </Wrapper>
  );
};

export default PostSection;

const Wrapper = styled.div``;
