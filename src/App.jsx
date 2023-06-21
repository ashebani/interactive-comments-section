import { useState } from "react";
import CommentCard from "./components/CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "./context/dataSlice";

function App() {
  const comments = useSelector((state) => state.data.comments);

  return (
    <main className="grid items-center justify-center py-20 gap-4 px-5">
      {comments.map((comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}
    </main>
  );
}

export default App;

// Delete reply: done
// Update reply: done
// Create reply in comment section: done
// Create reply in reply sectoin: done
