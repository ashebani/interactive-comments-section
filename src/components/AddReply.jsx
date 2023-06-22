import React, { useState } from "react";
import { dataActions } from "../context/dataSlice";
import { useDispatch, useSelector } from "react-redux";

const AddReply = ({ commentId, isReplying, isComment, replyId }) => {
  const dispatch = useDispatch();

  const currentUserImage = useSelector(
    (state) => state.data.currentUser.image.png
  );
  const [inputValue, setInputValue] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      dataActions.replyToComment({
        commentId: commentId,
        replyId: replyId,
        content: inputValue,
        isComment: isComment,
      })
    );
    setInputValue("");
    isReplying(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white flex md:grid md:grid-cols-2 justify-between max-w-3xl p-6 rounded-xl gap-6"
    >
      <img
        style={{
          gridArea: "2 / 1 / 3 / 2",
        }}
        src={require("../assets/avatars/" + currentUserImage)}
        className="h-9 w-9"
      />
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required
        style={{
          resize: "none",
          gridArea: "1 / 1 / 2 / 3",
        }}
        className="w-full p-2 rounded-lg border-[1px] h-20"
        placeholder="Add a reply..."
        cols="2000"
      />
      <button
        style={{
          gridArea: "2 / 2 / 3 / 3",
        }}
        className="bg-primaryModerateBlue text-neutralWhite uppercase self-start  px-3 py-2 rounded-md"
      >
        Reply
      </button>
    </form>
  );
};

export default AddReply;
