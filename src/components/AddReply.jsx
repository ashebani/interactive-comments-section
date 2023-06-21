import React, { useState } from "react";
import { dataActions } from "../context/dataSlice";
import { useDispatch, useSelector } from "react-redux";

const AddReply = ({ commentId, isReplying, comment }) => {
  const dispatch = useDispatch();

  const currentUserImage = useSelector(
    (state) => state.data.currentUser.image.png
  );
  const [inputValue, setInputValue] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      dataActions.addReply({ commentId: commentId, content: inputValue })
    );
    setInputValue("");
    isReplying(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white flex justify-between max-w-3xl p-6 mt-4 rounded-xl gap-6"
    >
      <img
        src={require("../assets/avatars/" + currentUserImage)}
        className="h-9 w-9"
      />
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required
        style={{ resize: "none" }}
        className="w-full p-2 rounded-lg border-[1px] h-20"
        placeholder="Add a comment..."
        cols="2000"
      />
      <button className="bg-primaryModerateBlue text-neutralWhite self-start px-3 py-2 rounded-md">
        Send
      </button>
    </form>
  );
};

export default AddReply;
