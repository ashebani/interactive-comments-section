import { useEffect, useState } from "react";
import CommentCard from "./components/CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "./context/dataSlice";

function App() {
  const comments = useSelector((state) => state.data.comments);
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [dispatch]);

  const currentUserImage = useSelector(
    (state) => state.data.currentUser.image.png
  );
  const [inputValue, setInputValue] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(dataActions.addComment(inputValue));
    setInputValue("");
  };

  return (
    <main className="grid items-center justify-center py-20 gap-4 px-5">
      {comments.map((comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}
      <form
        onSubmit={handleSubmit}
        className="bg-white flex justify-between max-w-3xl p-6 md:grid md:grid-cols-2 rounded-xl gap-6"
      >
        <img
          style={{
            gridArea: "2 / 1 / 3 / 2",
          }}
          src={require("./assets/avatars/" + currentUserImage)}
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
          placeholder="Add a comment..."
          cols="2000"
        />

        <button
          style={{
            gridArea: "2 / 2 / 3 / 3",
          }}
          className="bg-primaryModerateBlue text-neutralWhite uppercase self-start px-3 py-2 rounded-md"
        >
          Send
        </button>
      </form>
    </main>
  );
}

export default App;

// Delete reply: done
// Update reply: done
// Create reply in comment section: done
// Create reply in reply sectoin: done
