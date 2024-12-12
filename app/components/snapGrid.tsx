/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";
import { useDrop } from "react-dnd";
import EditComponent from "./editComponent";

type SlotTypes =
  | "Timer"
  | "QuestionNumber"
  | "ProgressBar"
  | "QuestionText"
  | "Image"
  | "OptionsLayout";

export type QuizComponentKeys =
  | "questionNumber"
  | "timer"
  | "progressBar"
  | "questionText"
  | "image"
  | "options";

export type QuizComponents = Record<QuizComponentKeys, string | null>;

const SnapGrid = ({ quizComponents, setQuizComponents }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableComponent, setEditableComponent] = useState<SlotTypes | null>(
    null
  );

  const slotOrder: Record<string, QuizComponentKeys> = {
    Timer: "timer",
    QuestionNumber: "questionNumber",
    ProgressBar: "progressBar",
    QuestionText: "questionText",
    Image: "image",
    OptionsLayout: "options",
  };

  const [, dropRef] = useDrop(() => ({
    accept: "COMPONENT",
    drop: (item: { type: SlotTypes }) => {
      const slot = slotOrder[item.type];
      if (item.type === "OptionsLayout") {
        setQuizComponents((prev: any) => ({
          ...prev,
          options: [
            { text: "Option 1", isCorrect: false },
            { text: "Option 2", isCorrect: false },
            { text: "Option 3", isCorrect: false },
            { text: "Option 4", isCorrect: false },
          ],
        }));
      } else {
        setQuizComponents((prev: any) => ({
          ...prev,
          [slot]: item.type,
        }));
      }
    },
  }));

  const handleEdit = (type: SlotTypes) => {
    setEditableComponent(type);
    setIsEditing(true);
  };

  return (
    <div className="flex">
      <div
        ref={dropRef}
        className="relative bg-gray-100 border rounded-lg p-6 w-3/4 flex flex-col gap-y-2"
        style={{ minHeight: 600, width: 500 }}
      >
        <div className="flex justify-between mb-4 text-black">
          {quizComponents.questionNumber && (
            <span
              className="font-bold cursor-pointer"
              onClick={() => handleEdit("QuestionNumber")}
            >
              Q.{quizComponents.questionNumber}
            </span>
          )}
          {quizComponents.timer && (
            <span
              className="font-bold cursor-pointer"
              onClick={() => handleEdit("Timer")}
            >
              {quizComponents.timer}
            </span>
          )}
        </div>

        {quizComponents.progressBar && (
          <div
            className="block h-2 rounded cursor-pointer bg-rose-400 text-black"
            onClick={() => handleEdit("ProgressBar")}
            style={{ backgroundColor: quizComponents.progressBar }}
          ></div>
        )}

        {quizComponents.questionText && (
          <p
            className="text-lg cursor-pointer text-black"
            onClick={() => handleEdit("QuestionText")}
          >
            {quizComponents.questionText}
          </p>
        )}

        {quizComponents.image && (
          <img
            src="https://picsum.photos/300/200"
            alt="Placeholder"
            className="w-full h-auto cursor-pointer"
            onClick={() => handleEdit("Image")}
          />
        )}

        {quizComponents.options && Array.isArray(quizComponents.options) && (
          <div className="flex flex-wrap justify-between text-black">
            {quizComponents.options.map((option: any, index: any) => (
              <div
                key={index}
                className="p-2 bg-white border rounded shadow w-1/2 my-1"
                onClick={() => handleEdit("OptionsLayout")}
              >
                <span>{option.text}</span>
                {option.isCorrect && <span> (Correct)</span>}
              </div>
            ))}
          </div>
        )}
      </div>

      {isEditing && editableComponent && (
        <EditComponent
          component={editableComponent}
          data={quizComponents[slotOrder[editableComponent]]}
          onSave={(newData) => {
            setQuizComponents((prev: any) => ({
              ...prev,
              [slotOrder[editableComponent]]: newData,
            }));
            setIsEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default SnapGrid;
