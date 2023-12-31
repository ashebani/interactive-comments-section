import { useEffect, useState } from "react";
import CommentCard from "./components/CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "./context/dataSlice";
import oldData from "./data.json";

function App() {
  const comments = useSelector((state) => state.data.comments);
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const currentUserImage = useSelector(
    (state) => state.data.currentUser.image.png
  );
  const [inputValue, setInputValue] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(dataActions.addComment(inputValue));
    setInputValue("");
  };

  return (
    <main className="grid items-center justify-center py-20 gap-4 px-5">
      <div className=" flex items-center justify-center gap-2">
        <button
          onClick={() => {
            console.log(oldData);
            dispatch(dataActions.resetData(oldData));
            localStorage.setItem("data", JSON.stringify(oldData));
          }}
          className="bg-primarySoftRed self-start p-4  text-white font-medium rounded-lg text-xl"
          type="button"
        >
          Reset Data
        </button>
        <p className="text-neutralGrayishBlue">
          Click the button then refresh the page to reset data.
        </p>
      </div>
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
