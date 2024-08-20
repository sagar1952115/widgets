import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCategory, removeWidget } from "../redux/widgets/widgetSlice";
import AddWidgetModal from "./AddWidgetModal";

const Dashboard = ({ category }) => {
  const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const dispatch = useDispatch();

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  const closeWidgetModal = () => {
    setIsWidgetModalOpen(false);
  };

  const openWidgetModal = () => {
    setIsWidgetModalOpen(true);
  };
  const handleAddWidget = (id) => {
    setCategoryId(id);
    openWidgetModal();
  };
  const handleDeleteCategory=(categoryId)=>{
    dispatch(deleteCategory({categoryId}))
  }
  return (
    <div className="container mx-auto p-4">
      {category.map((category, index) => (
        <div key={index} className="mb-8">
          <div className="flex justify-between items-center"><h2 className="text-xl font-bold mb-4">{category.name}</h2>  <img onClick={()=>handleDeleteCategory(category.id)}  src="/assets/trash.svg" alt="" className="w-6 h-8 cursor-pointer" /></div>
          <div className="grid grid-cols-4 gap-4">
            {category.widgets
              .filter((widget) => widget.visible)
              .map((widget) => (
                <div
                  key={widget.id}
                  className="p-4 bg-white shadow-lg relative w-full max-w-sm rounded-lg overflow-hidden group"
                >
                  <h3 className="text-lg font-semibold line-clamp-2">
                    {widget.name}
                  </h3>
                  <p className="line-clamp-3 text-gray-700">{widget.text}</p>
                  <button
                    onClick={() => handleRemoveWidget(category.id, widget.id)}
                    className="absolute top-2 right-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <img src="/assets/trash.svg" alt="" className="w-6 h-8" />
                    
                  </button>
                </div>
              ))}
            <div
              className="p-4 bg-white shadow-lg relative w-full max-w-sm rounded-lg flex flex-col items-center justify-center cursor-pointer hover:shadow-xl transition-shadow duration-300"
              onClick={() => handleAddWidget(category.id)}
            >
              <img src="/assets/plus.svg" alt="" className="w-16 h-16 my-2" />
              <p className="text-gray-500 font-medium">Add Widget</p>
            </div>
          </div>
        </div>
      ))}
      <AddWidgetModal
        isOpen={isWidgetModalOpen}
        categoryId={categoryId}
        closeModal={closeWidgetModal}
      />
    </div>
  );
};

export default Dashboard;
