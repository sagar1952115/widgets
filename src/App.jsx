import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import ManageWidgetDrawer from "./components/ManageWidgetDrawer";
import AddCategoryModal from "./components/AddCategoryModal";
import { useSelector } from "react-redux";

function App() {
  const categories = useSelector((state) => state.widgets.categories);
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(categories);
  const [search, setSearch] = useState("");

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  const closeCategoryModal = () => {
    setIsCategoryModalOpen(false);
  };

  const openCategoryModal = () => {
    setIsCategoryModalOpen(true);
  };

  useEffect(() => {
    if (search) {
      const filtered = categories?.map((cat) => ({
        ...cat,
        widgets: cat.widgets.filter(
          (widget) =>
            widget?.name?.toLowerCase().includes(search?.toLowerCase()) ||
            widget?.text?.toLowerCase().includes(search?.toLowerCase())
        ),
      }));

      // Move categories with matching widgets to the top
      filtered.sort((a, b) => (b.widgets.length > 0) - (a.widgets.length > 0));

      setFilteredData(filtered);
    } else {
      setFilteredData(categories);
    }
  }, [categories, search]);

  return (
    <div className="bg-cyan w-full min-h-screen">
      <div className="bg-white shadow-md"><div className="flex p-6 justify-between items-center max-w-[1600px] mx-auto  ">
        <h1 className="text-4xl font-bold text-gray-800">Dynamic Dashboard</h1>
        <div className="flex-grow mx-8">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg w-full max-w-md px-4 py-2 outline-none border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
            placeholder="Search widgets here"
            type="text"
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={openCategoryModal}
            className="bg-blue-500 px-6 py-2 rounded-lg text-white font-semibold hover:bg-blue-600 transition"
          >
            Add Category
          </button>
          <button
            onClick={toggleDrawer}
            className="bg-green-600 px-6 py-2 rounded-lg text-white font-semibold hover:bg-green-700 transition"
          >
            Manage Widgets
          </button>
        </div>
      </div></div>

      <Dashboard category={filteredData} />

      {isOpen && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 bg-opacity-20 transition-transform z-40"
        ></div>
      )}
      <ManageWidgetDrawer closeDrawer={closeDrawer} isOpen={isOpen} />

      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        closeModal={closeCategoryModal}
      />
    </div>
  );
}

export default App;
