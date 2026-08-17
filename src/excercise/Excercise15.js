import React, { useReducer } from "react";

// ======================================================
// EXERCISE 15: useReducer
// ======================================================

// ======================================================
// EXERCISE 1: SIMPLE COUNTER
// ======================================================

function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;

    case "DECREMENT":
      return state - 1;

    case "RESET":
      return 0;

    default:
      return state;
  }
}

function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        marginBottom: "30px",
        borderRadius: "10px",
      }}
    >
      <h2>Exercise 1: Counter</h2>

      <h3>Count: {count}</h3>

      <button
        onClick={() => dispatch({ type: "INCREMENT" })}
        style={{ margin: "5px" }}
      >
        +
      </button>

      <button
        onClick={() => dispatch({ type: "DECREMENT" })}
        style={{ margin: "5px" }}
      >
        -
      </button>

      <button
        onClick={() => dispatch({ type: "RESET" })}
        style={{ margin: "5px" }}
      >
        Reset
      </button>
    </div>
  );
}

// ======================================================
// EXERCISE 2: QUESTION BANK
// ======================================================

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Arctic Ocean",
        "Pacific Ocean",
      ],
      answer: "Pacific Ocean",
    },
    {
      id: 4,
      question: "Which language is used to create web pages?",
      options: ["HTML", "Java", "Python", "C++"],
      answer: "HTML",
    },
  ],

  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
};

function reducer(state, action) {
  switch (action.type) {
    // Người dùng chọn đáp án
    case "SELECT_OPTION":
      return {
        ...state,
        selectedOption: action.payload,
      };

    // Chuyển sang câu hỏi tiếp theo
    case "NEXT_QUESTION": {
      const currentQuestion =
        state.questions[state.currentQuestion];

      const isCorrect =
        state.selectedOption === currentQuestion.answer;

      const newScore = isCorrect
        ? state.score + 1
        : state.score;

      // Nếu là câu cuối
      if (state.currentQuestion === state.questions.length - 1) {
        return {
          ...state,
          score: newScore,
          showScore: true,
        };
      }

      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedOption: "",
        score: newScore,
      };
    }

    // Làm lại quiz
    case "RESTART_QUIZ":
      return {
        ...state,
        currentQuestion: 0,
        selectedOption: "",
        score: 0,
        showScore: false,
      };

    default:
      return state;
  }
}

function QuestionBank() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    currentQuestion,
    selectedOption,
    score,
    showScore,
  } = state;

  // Chọn đáp án
  const handleOptionSelect = (option) => {
    dispatch({
      type: "SELECT_OPTION",
      payload: option,
    });
  };

  // Chuyển câu hỏi
  const handleNextQuestion = () => {
    if (selectedOption === "") {
      alert("Please select an answer!");
      return;
    }

    dispatch({
      type: "NEXT_QUESTION",
    });
  };

  // Làm lại
  const handleRestartQuiz = () => {
    dispatch({
      type: "RESTART_QUIZ",
    });
  };

  // Hiển thị kết quả
  if (showScore) {
    return (
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h2>Exercise 2: Question Bank</h2>

        <h3>
          Your Score: {score} / {questions.length}
        </h3>

        <button onClick={handleRestartQuiz}>
          Restart Quiz
        </button>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>Exercise 2: Question Bank</h2>

      <p>
        Question {currentQuestion + 1} / {questions.length}
      </p>

      <h3>{question.question}</h3>

      <div>
        {question.options.map((option) => (
          <div key={option} style={{ margin: "10px 0" }}>
            <label>
              <input
                type="radio"
                name="answer"
                value={option}
                checked={selectedOption === option}
                onChange={() => handleOptionSelect(option)}
              />

              {" "}

              {option}
            </label>
          </div>
        ))}
      </div>

      <button onClick={handleNextQuestion}>
        {currentQuestion === questions.length - 1
          ? "Finish"
          : "Next Question"}
      </button>
    </div>
  );
}

// ======================================================
// MAIN COMPONENT CỦA EXERCISE 15
// ======================================================

function Exercise15() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Exercise 15: React Hook (useReducer)</h1>

      <Counter />

      <QuestionBank />
    </div>
  );
}

export default Exercise15;