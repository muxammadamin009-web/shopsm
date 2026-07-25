import { useEffect, useState } from "react";
import api from "../../../api/axios";
import toast from "react-hot-toast";

function AdminCategories() {

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");

  const getCategories = async () => {

    try {

      const res = await api.get("/categories");

      setCategories(res.data);

    } catch (error) {

      toast.error(error.response?.data?.message || "Failed to fetch categories");

    }

  };

  useEffect(() => {

    getCategories();

  }, []);

  const createCategory = async (e) => {

    e.preventDefault();

    if (!name.trim()) return;

    try {

      await api.post(
        "/categories",
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setName("");

      getCategories();

    } catch (error) {

      toast.error(error.response?.data?.message || "Failed to create category");

    }

  };

  const deleteCategory = async (id) => {

    if (!window.confirm("Delete this category?")) return;

    try {

      await api.delete(
        `/categories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      getCategories();

    } catch (error) {

      toast.error(error.response?.data?.message || "Failed to delete category");

    }

  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-10 transition-colors">

      <h1 className="text-5xl font-bold mb-8">
        📂 Manage Categories
      </h1>

      <form
        onSubmit={createCategory}
        className="flex gap-4 mb-8"
      >

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category..."
          className="flex-1 p-4 rounded-xl border dark:bg-gray-800 dark:border-gray-700"
        />

        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 rounded-xl transition"
        >
          Add
        </button>

      </form>

      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-xl border dark:bg-gray-800 dark:border-gray-700 mb-8"
      />

      <div className="space-y-4">

        {filteredCategories.map((category) => (

          <div
            key={category._id}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-5 flex justify-between items-center"
          >

            <h2 className="text-xl font-bold">
              📁 {category.name}
            </h2>

            <button
              onClick={() => deleteCategory(category._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
            >
              Delete
            </button>

          </div>

        ))}

        {filteredCategories.length === 0 && (

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold">
              No categories found 📭
            </h2>

          </div>

        )}

      </div>

    </div>

  );

}

export default AdminCategories;