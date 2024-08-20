import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWidgetVisibility } from "../redux/widgets/widgetSlice";

const ManageWidgetDrawer = ({ isOpen, closeDrawer }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.widgets.categories);
  const [selected, setSelected] = useState(0);

  
  // Update localVisibility whenever categories changes
  const localVisibility = useMemo(
    () =>
      categories.map((category) =>
        category.widgets.reduce((acc, widget) => {
          acc[widget.id] = widget.visible;
          return acc;
        }, {})
      ),
      [categories]
    );
    
    const [visibilityState, setVisibilityState] = useState(localVisibility);

  const handleCheckboxChange = (categoryIndex, widgetId, visible) => {
    setVisibilityState((prevState) => {
      const newState = [...prevState];
      newState[categoryIndex][widgetId] = visible;
      return newState;
    });
  };

  const handleConfirm = () => {
    visibilityState.forEach((categoryVisibility, categoryIndex) => {
      const categoryId = categories[categoryIndex].id;
      Object.entries(categoryVisibility).forEach(([widgetId, visible]) => {
        dispatch(toggleWidgetVisibility({ categoryId, widgetId, visible }));
      });
    });
    closeDrawer();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white z-50 transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } shadow-lg`}
      style={{ width: "50vw", boxShadow: "-10px 0 15px -3px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Manage Widgets</h2>
          <div className="flex gap-4 mt-4">
            {categories.map((curr, i) => (
              <div
                onClick={() => setSelected(i)}
                key={curr.id}
                className={`cursor-pointer px-4 py-2 rounded-md ${
                  selected === i
                    ? "font-bold bg-gray-100"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {curr.name.split(" ")[0]}
              </div>
            ))}
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-6">
          {categories[selected]?.widgets.map((curr) => (
            <div
              className="flex gap-3 items-center py-2 px-4 bg-gray-50 rounded-md mb-2"
              key={curr.id}
            >
              <input
                type="checkbox"
                checked={localVisibility[selected][curr.id]}
                onChange={(e) =>
                  handleCheckboxChange(selected, curr.id, e.target.checked)
                }
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <div className="text-gray-800">{curr.name}</div>
            </div>
          ))}
        </div>
        <div className="p-6 flex justify-end">
          <button
            className="p-2 px-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageWidgetDrawer;
