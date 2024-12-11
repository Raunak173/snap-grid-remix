/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/rules-of-hooks */
import { LoaderFunction } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

export const loader: LoaderFunction = async () => {
  try {
    const response = await fetch(
      "https://backend-snap-grid-production.up.railway.app/api/quiz"
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      return json(data);
    } else {
      return json({ error: "Failed to fetch quiz data" });
    }
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return json({ error: "Failed to fetch quiz data" });
  }
};

const User = () => {
  const quizData: any = useLoaderData();
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [answered, setAnswered] = useState(false);

  if (quizData?.data?.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl text-red-500">No data to display</p>
      </div>
    );
  }

  const quiz = quizData?.data[quizIndex];

  const handleOptionSelect = (option: { isCorrect: any }) => {
    setSelectedOption(option);
    setAnswered(true);
    if (option.isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
    setTimeout(handleNextQuestion, 2000);
  };

  const handleNextQuestion = () => {
    setAnswered(false);
    if (quizIndex < quizData?.data?.length - 1) {
      setQuizIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    }
  };

  useEffect(() => {
    if (quiz) {
      setTimeLeft(Number(quiz?.timer));
    }
  }, [quiz]);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval: any = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          handleNextQuestion();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    setTimerInterval(interval);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const progressBarWidth = quiz.timer ? (timeLeft / quiz.timer) * 100 : 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 p-4 md:p-8">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          {quiz?.questionText}
        </h1>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className={`h-2 rounded-full bg-green-500`}
            style={{
              width: `${progressBarWidth}%`,
              backgroundColor: quiz?.progressBar,
            }}
          />
        </div>

        {quiz?.image && (
          <img
            src={
              quiz?.image !== "Image"
                ? quiz?.image
                : "https://picsum.photos/300/200"
            }
            // src={"https://picsum.photos/300/200"}
            alt="Quiz Image"
            className="w-full h-48 object-cover rounded-lg mb-6"
          />
        )}

        <div className="flex flex-wrap justify-between gap-y-4">
          {quiz?.options?.map((option: any, index: any) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={selectedOption !== null}
              style={{
                width: "48%",
                backgroundColor: option?.isCorrect && answered ? "green" : "",
              }}
            >
              {option?.text}
            </button>
          ))}
        </div>

        {selectedOption && (
          <div className="text-center mt-2">
            <p
              className={`text-xl ${
                selectedOption?.isCorrect ? "text-green-500" : "text-red-500"
              }`}
            >
              {selectedOption?.isCorrect ? "Correct!" : "Incorrect!"} Your
              score: {score}
            </p>
            <button
              onClick={handleNextQuestion}
              className="mt-4 bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Next Question
            </button>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-lg text-gray-800">
            Question {quizIndex + 1} of {quizData?.data?.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default User;
