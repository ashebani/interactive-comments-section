import { createSlice, nanoid } from "@reduxjs/toolkit";
import data from "../data.json";

// const currentData = JSON.parse(localStorage.getItem("data"));
// const returnCurrentData = () => {
//   if (currentData) {
//     console.log(currentData);
//     return data;
//   } else {
//     return currentData;
//   }
// };

export const dataSlice = createSlice({
  name: "data",
  initialState: data,

  reducers: {
    increment: (state, action) => {
      const id = action.payload;

      const existingItem = state.comments.find((comment) => comment.id === id);
      existingItem.score += 1;
    },
    decrement: (state, action) => {
      const id = action.payload;

      const existingItem = state.comments.find((comment) => comment.id === id);
      if (existingItem.score === 0) return;
      existingItem.score -= 1;
    },

    replyIncrement: (state, action) => {
      const commentID = action.payload.commentId;
      const replyID = action.payload.replyId;

      const currentComment = state.comments.find(
        (comment) => comment.id === commentID
      );
      const currentReply = currentComment.replies.find(
        (reply) => reply.id === replyID
      );

      currentReply.score += 1;
    },
    replyDecrement: (state, action) => {
      const commentID = action.payload.commentId;
      const replyID = action.payload.replyId;

      const currentComment = state.comments.find(
        (comment) => comment.id === commentID
      );
      const currentReply = currentComment.replies.find(
        (reply) => reply.id === replyID
      );
      if (currentReply.score === 0) return;
      currentReply.score -= 1;
    },

    deleteReply: (state, action) => {
      const commentID = action.payload.commentId;
      const replyID = action.payload.replyId;

      const currentComment = state.comments.find(
        (comment) => comment.id === commentID
      );

      const newReplies = currentComment.replies.filter(
        (currentReply) => currentReply.id !== replyID
      );

      currentComment.replies = [...newReplies];
    },

    addReply: (state, action) => {
      const commentID = action.payload.commentId;

      const currentComment = state.comments.find(
        (comment) => comment.id === commentID
      );
      const newReply = {
        id: nanoid(),
        content: action.payload.content,
        // TODO: Implement days ago function
        createdAt: "4 days ago",
        score: 0,
        replyingTo: currentComment.user.username,
        user: {
          image: {
            png: "image-juliusomo.png",
            webp: "image-juliusomo.webp",
          },
          username: "juliusomo",
        },
      };
      currentComment.replies.push(newReply);
    },

    editReply: (state, action) => {
      const commentID = action.payload.commentId;
      const replyID = action.payload.replyId;

      const currentComment = state.comments.find(
        (comment) => comment.id === commentID
      );

      const editedReply = currentComment.replies.find(
        (currentReply) => currentReply.id === replyID
      );

      editedReply.content = action.payload.content;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice.reducer;
