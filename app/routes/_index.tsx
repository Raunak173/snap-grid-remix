import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import ButtonsComponent from "~/components/buttonsComponent";
import LeftDrawer from "~/components/leftDrawer";
import SnapGrid, { QuizComponents } from "~/components/snapGrid";
import "react-toastify/dist/ReactToastify.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Snap Grid Chaabi" },
    { name: "description", content: "Welcome to Snap grid app" },
  ];
};

export default function Index() {
  const [quizComponents, setQuizComponents] = useState<QuizComponents>({
    questionNumber: null,
    timer: null,
    progressBar: null,
    questionText: null,
    image: null,
    options: null,
  });
  return (
    <div className="flex flex-col items-center gap-y-5 pt-10 bg-gray-300 h-auto w-screen md:flex-col md:gap-y-8 lg:flex-row lg:items-start lg:gap-x-10 lg:pt-20 lg:h-screen justify-center">
      <div className="w-full md:w-3/4 lg:w-auto flex justify-center md:justify-start">
        <LeftDrawer />
      </div>
      <div className="flex flex-col items-center w-full md:w-3/4 lg:w-auto gap-y-5 md:gap-y-6">
        <div className="w-full px-4 md:px-8 lg:w-auto">
          <SnapGrid
            quizComponents={quizComponents}
            setQuizComponents={setQuizComponents}
          />
        </div>
        <div className="w-full px-4 md:px-8 lg:w-auto">
          <ButtonsComponent
            quizComponents={quizComponents}
            setQuizComponents={setQuizComponents}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
