import React, { useState } from "react";
import ReplyCard from "./ReplyCard";
import AddReply from "./AddReply";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../context/dataSlice";
const CommentCard = ({ comment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const isCurrentUser = data.currentUser.username === comment.user.username;

  const incrementScore = () => {
    dispatch(dataActions.increment(comment.id));
  };
  const DecrementScore = () => {
    dispatch(dataActions.decrement(comment.id));
  };

  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="grid" style={{ justifyItems: "end" }}>
      <div className="bg-white flex max-w-3xl p-6 md:p-5 rounded-xl gap-6 w-[100%] md:flex-col-reverse">
        <div className="flex justify-between">
          {/* Counter */}
          <div className="grid p-3 self-start rounded-lg text-center bg-neutralLightGray gap-4 md:flex">
            <button className="pl-[5px] w-5 h-5" onClick={incrementScore}>
              <img srcSet={require("../assets/icon-plus.svg").default} alt="" />
            </button>
            <p className="text-primaryModerateBlue text-md font-medium">
              {comment.score}
            </p>
            <button className="pl-[5px] w-5 h-5" onClick={DecrementScore}>
              <img
                srcSet={require("../assets/icon-minus.svg").default}
                alt=""
              />
            </button>
          </div>
          {/* Mobile only button */}
          <button
            className="hidden items-center gap-2 md:flex "
            onClick={() => setIsReplying(!isReplying)}
          >
            <img
              src={require("../assets/icon-reply.svg").default}
              alt=""
              className="h-4 w-4"
            />{" "}
            <p className="text-primaryModerateBlue font-bold">Reply</p>
          </button>
        </div>
        {/* Comment Components */}
        <div className="grid gap-2 items-start w-full ">
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
              {isCurrentUser ? (
                <div className="bg-primaryModerateBlue text-xs text-neutralWhite px-2 py-1 rounded-sm">
                  you
                </div>
              ) : (
                ""
              )}
              <p className="text-neutralGrayishBlue">{comment.createdAt}</p>
            </div>
            <div>
              <button
                className="flex items-center md:hidden gap-2"
                onClick={() => setIsReplying(!isReplying)}
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
        className="flex relative w-full"
        style={{ marginTop: comment.replies.length === 0 ? "0px" : "16px" }}
      >
        {/* Extra line on the left */}
        <div className="h-full bg-black border-2 border-l-neutralGrayishBlue opacity-20 rounded-md absolute left-[5%] md:left-0 md:relative "></div>
        <div className="flex flex-col items-end gap-4 w-[100%]">
          {comment.replies.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} commentId={comment.id} />
          ))}
        </div>
      </div>

      {isReplying ? (
        <div className="mt-4">
          <AddReply
            commentId={comment.id}
            isComment={true}
            isReplying={setIsReplying}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CommentCard;
