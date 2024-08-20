import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../redux/widgets/widgetSlice";

const AddCategoryModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  const dispatch = useDispatch();
  const [cat, setCat] = useState("");

  const handleSubmit = () => {
    if (!cat.trim()) return; // Optional: Prevent submission if the category is empty

    dispatch(addCategory({ id: Date.now(), name: cat }));
    closeModal();
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Category</h2>
        <input
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          type="text"
          placeholder="Category Name"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full p-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddCategoryModal;
