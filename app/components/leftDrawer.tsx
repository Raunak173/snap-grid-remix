import { useDrag } from "react-dnd";

const ComponentItem = ({ type, label }: { type: string; label: string }) => {
  const [, dragRef] = useDrag(() => ({
    type: "COMPONENT",
    item: { type },
  }));

  return (
    <div
      ref={dragRef}
      className="p-2 border rounded mb-2 bg-white cursor-pointer shadow text-black"
    >
      {label}
    </div>
  );
};

const LeftDrawer = () => {
  return (
    <aside className="bg-gray-100 w-64 p-4 h-full border-r border-gray-300">
      <h2 className="text-lg font-bold mb-4 text-black">Components</h2>
      <ComponentItem type="ProgressBar" label="Progress Bar" />
      <ComponentItem type="QuestionText" label="Question Text" />
      <ComponentItem type="OptionsLayout" label="4 Options Layout" />
      <ComponentItem type="Timer" label="Timer" />
      <ComponentItem type="QuestionNumber" label="Question Number" />
      <ComponentItem type="Image" label="Image" />
    </aside>
  );
};

export default LeftDrawer;
