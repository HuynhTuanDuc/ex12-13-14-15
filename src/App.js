import { useState } from "react";
import Excercise12 from "./excercise/Excercise12";
import Excercise13 from "./excercise/Excercise13";
import Excercise14 from "./excercise/Excercise14";


function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <button onClick={() => setPage("home")}>
        Home
      </button>

      <button onClick={() => setPage("exercise12")}>
        Exercise 12
      </button>
      <button onClick={() => setPage("exercise13")}>
        Exercise 13
      </button>
      <button onClick={() => setPage("exercise14")}>
        Exercise 14
      </button>
      {page === "home" && (
        <div>
          <h1>Home Page</h1>
          <p>Welcome to Home</p>
        </div>
      )}

      {page === "exercise12" && (
        <Excercise12 />
      )}
      {page === "exercise13" && (
        <Excercise13 />
      )}
      {page === "exercise14" && (
        <Excercise14 />
      )}
    </div>
  );
}

export default App;