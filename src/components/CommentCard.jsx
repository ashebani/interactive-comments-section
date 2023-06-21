import React, { useState } from "react";
import ReplyCard from "./ReplyCard";
import AddReply from "./AddReply";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../context/dataSlice";
const CommentCard = ({ comment }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  const incrementScore = () => {
    dispatch(dataActions.increment(comment.id));
    localStorage.setItem("data", JSON.stringify(data));
  };
  const DecrementScore = async () => {
    await dispatch(dataActions.decrement(comment.id));
    await localStorage.setItem("data", JSON.stringify(data));
  };

  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="grid" style={{ justifyItems: "end" }}>
      <div className="bg-white flex max-w-3xl p-6 rounded-xl gap-6">
        {/* Counter */}
        <div className="grid p-3 self-start rounded-lg text-center bg-neutralLightGray gap-4">
          <button className="pl-[5px] w-5 h-5" onClick={incrementScore}>
            <img srcSet={require("../assets/icon-plus.svg").default} alt="" />
          </button>
          <p className="text-primaryModerateBlue text-md font-medium">
            {comment.score}
          </p>
          <button className="pl-[5px] w-5 h-5" onClick={DecrementScore}>
            <img srcSet={require("../assets/icon-minus.svg").default} alt="" />
          </button>
        </div>
        {/* Comment Components */}
        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-4 items-center">
              <img
                src={require("../assets/avatars/" + comment.user.image.png)}
                className="h-9 w-9"
                alt={comment.user.image.png.slice(
                  6,
                  comment.user.image.png.length - 4
                )}
              />
              <p className="font-medium">{comment.user.username}</p>
              <p className="text-neutralGrayishBlue">{comment.createdAt}</p>
            </div>
            <div>
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="flex items-center gap-2"
              >
                <img
                  src={require("../assets/icon-reply.svg").default}
                  alt=""
                  className="h-4 w-4"
                />{" "}
                <p className="text-primaryModerateBlue font-bold">Reply</p>
              </button>
            </div>
          </div>
          <p className="text-neutralGrayishBlue">{comment.content}</p>
        </div>
      </div>
      <div
        className="flex flex-col items-end gap-2 w-[100%]"
        style={{ marginTop: comment.replies.length === 0 ? "0px" : "16px" }}
      >
        {comment.replies.map((reply) => (
          <ReplyCard key={reply.id} reply={reply} commentId={comment.id} />
        ))}
      </div>
      {isReplying ? (
        <AddReply
          commentId={comment.id}
          comment={comment}
          isReplying={setIsReplying}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default CommentCard;
