/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

type EditComponentProps = {
  component: string;
  data: any;
  onSave: (newData: any) => void;
};

const EditComponent: React.FC<EditComponentProps> = ({
  component,
  data,
  onSave,
}) => {
  const [editedData, setEditedData] = useState(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number,
    field?: string
  ) => {
    if (component === "OptionsLayout" && Array.isArray(editedData)) {
      const updatedOptions = [...editedData];
      if (index !== undefined && field) {
        updatedOptions[index] = {
          ...updatedOptions[index],
          [field]: e.target.value,
        };
        setEditedData(updatedOptions);
      }
    } else {
      setEditedData(e.target.value);
    }
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedOptions = [...editedData];
    updatedOptions[index].isCorrect = e.target.checked;
    setEditedData(updatedOptions);
  };

  const handleSave = () => {
    onSave(editedData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 sm:p-4 rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/2 max-w-[95%]">
        <h2 className="text-xl sm:text-lg font-bold">Edit {component}</h2>
        {component === "OptionsLayout" && Array.isArray(editedData) ? (
          editedData.map((option, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                value={option.text}
                onChange={(e) => handleChange(e, index, "text")}
                className="p-2 border rounded w-full"
                placeholder={`Option ${index + 1}`}
              />
              <label className="ml-2 flex items-center">
                Correct Answer
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(e) => handleCheckboxChange(e, index)}
                  className="ml-2"
                />
              </label>
            </div>
          ))
        ) : component === "ProgressBar" ? (
          <div className="mb-2">
            <input
              type="color"
              value={editedData}
              onChange={(e) => handleChange(e)}
              className="p-2 border rounded w-full"
            />
          </div>
        ) : (
          <div className="mb-2">
            <input
              type="text"
              value={editedData}
              onChange={(e) => handleChange(e)}
              className="p-2 border rounded w-full"
            />
          </div>
        )}
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded w-[48%]"
          >
            Save
          </button>
          <button
            onClick={() => onSave(data)}
            className="bg-gray-500 text-white px-4 py-2 rounded w-[48%]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditComponent;
