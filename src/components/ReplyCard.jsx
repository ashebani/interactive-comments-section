import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../context/dataSlice";
import DeleteComment from "./DeleteComment";
import AddReply from "./AddReply";

const ReplyCard = ({ reply, commentId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(reply.content);
  const [isOpen, setIsOpen] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const currentUser = useSelector((state) => state.data.currentUser);
  const isCurrentUser = currentUser.username === reply.user.username;
  const dispatch = useDispatch();
  const replyIncrementScore = () => {
    dispatch(
      dataActions.replyIncrement({ replyId: reply.id, commentId: commentId })
    );
  };
  const replyDecrementScore = () => {
    dispatch(
      dataActions.replyDecrement({ replyId: reply.id, commentId: commentId })
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      dataActions.editReply({
        commentId: commentId,
        content: inputValue,
        replyId: reply.id,
      })
    );
    setIsEditing(false);
  };

  return (
    <>
      <div className="bg-white self-end flex max-w-3xl p-6 md:p-5 md:w-[96%] rounded-xl gap-6 w-[90%]  md:flex-col-reverse">
        <>
          {/* Counter */}
          <div className="flex justify-between">
            <div className="grid p-3 self-start md:flex rounded-lg text-center bg-neutralLightGray gap-4">
              <button
                className="pl-[5px] w-5 h-5"
                onClick={replyIncrementScore}
              >
                <img
                  srcSet={require("../assets/icon-plus.svg").default}
                  alt=""
                />
              </button>
              <p className="text-primaryModerateBlue text-md font-medium">
                {reply.score}
              </p>
              <button
                className="pl-[5px] w-5 h-5"
                onClick={replyDecrementScore}
              >
                <img
                  srcSet={require("../assets/icon-minus.svg").default}
                  alt=""
                />
              </button>
            </div>
            {isCurrentUser ? (
              <div className="hidden md:flex gap-6">
                <button
                  className="flex items-center gap-2"
                  onClick={() => setIsOpen(true)}
                >
                  <img
                    src={require("../assets/icon-delete.svg").default}
                    alt=""
                    className="h-4 w-4"
                  />{" "}
                  <p className="text-primarySoftRed font-bold">Delete</p>
                </button>
                <button
                  className="flex items-center gap-2"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <img
                    src={require("../assets/icon-edit.svg").default}
                    alt=""
                    className="h-4 w-4"
                  />{" "}
                  <p className="text-primaryModerateBlue font-bold">Edit</p>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="hidden items-center gap-2  md:flex "
              >
                <img
                  src={require("../assets/icon-reply.svg").default}
                  alt=""
                  className="h-4 w-4"
                />{" "}
                <p className="text-primaryModerateBlue font-bold">Reply</p>
              </button>
            )}
          </div>

          {/* Comment Part */}
          <div className="grid self-start gap-2 w-[100%]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-4 items-center">
                <img
                  src={require("../assets/avatars/" + reply.user.image.png)}
                  className="h-9 w-9"
                  alt={reply.user.image.png.slice(
                    6,
                    reply.user.image.png.length - 4
                  )}
                />
                <p className="font-medium">{reply.user.username}</p>

                {/* Custom "you" div */}
                {isCurrentUser ? (
                  <div className="bg-primaryModerateBlue text-xs text-neutralWhite px-2 py-1 rounded-sm">
                    you
                  </div>
                ) : (
                  ""
                )}
                <p className="text-neutralGrayishBlue">{reply.createdAt}</p>
              </div>

              <div>
                {/* Implement Current User Interface */}
                {isCurrentUser ? (
                  <div className="flex gap-6 md:hidden">
                    <button
                      className="flex items-center gap-2"
                      onClick={() => setIsOpen(true)}
                    >
                      <img
                        src={require("../assets/icon-delete.svg").default}
                        alt=""
                        className="h-4 w-4"
                      />{" "}
                      <p className="text-primarySoftRed font-bold">Delete</p>
                    </button>
                    <button
                      className="flex items-center gap-2"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <img
                        src={require("../assets/icon-edit.svg").default}
                        alt=""
                        className="h-4 w-4"
                      />{" "}
                      <p className="text-primaryModerateBlue font-bold">Edit</p>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsReplying(!isReplying)}
                    className="flex items-center gap-2 md:hidden "
                  >
                    <img
                      src={require("../assets/icon-reply.svg").default}
                      alt=""
                      className="h-4 w-4"
                    />{" "}
                    <p className="text-primaryModerateBlue font-bold">Reply</p>
                  </button>
                )}
              </div>
            </div>
            {/* Implement Editing Interface 'Update' */}
            {isEditing ? (
              <form
                onSubmit={handleSubmit}
                className="bg-white grid justify-between max-w-3xl pt-2 rounded-xl gap-6"
              >
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  required
                  style={{ resize: "none" }}
                  className="w-full p-2 rounded-lg border-[1px] h-20"
                  placeholder="Add a comment..."
                  cols="2000"
                />
                <button className="bg-primaryModerateBlue uppercase justify-self-end text-neutralWhite self-start px-3 py-2 rounded-md">
                  Update
                </button>
              </form>
            ) : (
              <p className="text-neutralGrayishBlue">
                <span className="text-primaryModerateBlue font-medium">
                  @{reply.replyingTo}
                </span>{" "}
                {reply.content}
              </p>
            )}
          </div>
        </>
        {/* Delete Alert */}
        {isOpen ? (
          <DeleteComment
            replyid={reply.id}
            commentid={commentId}
            isOpen={setIsOpen}
          />
        ) : (
          ""
        )}
      </div>
      {/* implement replyCard */}

      {isReplying ? (
        <div className="w-[90%]">
          <AddReply
            commentId={commentId}
            replyId={reply.id}
            isReplying={setIsReplying}
            isComment={false}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ReplyCard;
