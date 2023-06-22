import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../context/dataSlice";

const DeleteComment = ({ isOpen, replyid, commentid }) => {
  const dispatch = useDispatch();
  const deleteReply = () => {
    dispatch(
      dataActions.deleteReply({
        commentId: commentid,
        replyId: replyid,
      })
    );
    isOpen(false);
  };

  return (
    <div
      className="w-[100vw] h-[120vh] z-10 top-0 flex fixed justify-center items-center -left-0"
      style={{ backgroundColor: "rgb(0,0,0,0.5)" }}
    >
      <div className="bg-white p-8 rounded-lg w-96 grid gap-4 ">
        <h2 className="text-lg font-medium tigh text-neutralGrayishBlue">
          Delete comment
        </h2>
        <p className="text-neutralGrayishBlue">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div className="flex gap-2 justify-between">
          <button
            onClick={() => isOpen(false)}
            className="text-neutralWhite rounded-md px-6 py-2 font-medium text-md bg-neutralGrayishBlue uppercase "
          >
            No, Cancel
          </button>
          <button
            onClick={deleteReply}
            className="text-neutralWhite rounded-md px-6 py-2 font-medium text-md bg-primarySoftRed uppercase "
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteComment;
