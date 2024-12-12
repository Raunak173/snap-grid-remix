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
    <div className="flex gap-x-10 items-start pt-20">
      <LeftDrawer />
      <SnapGrid
        quizComponents={quizComponents}
        setQuizComponents={setQuizComponents}
      />
      <ButtonsComponent
        quizComponents={quizComponents}
        setQuizComponents={setQuizComponents}
      />
      <ToastContainer />
    </div>
  );
}
