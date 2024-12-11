/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { toast } from "react-toastify";

type ButtonsComponentProps = {
  quizComponents: any;
  setQuizComponents: any;
};

const ButtonsComponent: React.FC<ButtonsComponentProps> = ({
  quizComponents,
  setQuizComponents,
}) => {
  const onSavePage = async () => {
    console.log(JSON.stringify(quizComponents));
    try {
      const response = await fetch(
        "https://backend-snap-grid-production.up.railway.app/api/quiz/add",
        // "http://localhost:8000/api/quiz/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quizComponents),
        }
      );

      const result = await response.json();

      if (result.ok) {
        console.log(result.message);
      } else {
        console.error(result.message);
      }
      toast("Question saved");
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
    setQuizComponents({
      questionNumber: null,
      timer: null,
      progressBar: null,
      questionText: null,
      image: null,
      options: null,
    });
  };
  const onDiscardPage = () => {
    setQuizComponents({
      questionNumber: null,
      timer: null,
      progressBar: null,
      questionText: null,
      image: null,
      options: null,
    });
    toast("Page discarded!");
  };
  return (
    <div className="flex justify-end gap-4 mt-6 flex-col">
      <button
        onClick={onSavePage}
        className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
      >
        Save Page
      </button>

      <button
        onClick={onDiscardPage}
        className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
      >
        Discard Page
      </button>
    </div>
  );
};

export default ButtonsComponent;
