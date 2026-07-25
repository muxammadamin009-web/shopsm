import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import toast from "react-hot-toast";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);

  useEffect(() => {

    api.get(`/products/${id}`)
      .then((res) => {

        setName(res.data.name);
        setDescription(res.data.description);
        setPrice(res.data.price);
        setImage(res.data.image);

        if (res.data.category?._id) {
          setCategory(res.data.category._id);
        } else {
          setCategory(res.data.category);
        }

      })
      .catch(console.log);

    api.get("/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch(console.log);

  }, [id]);

  const updateProduct = async (e) => {

    e.preventDefault();

    try {

      await api.put(
        `/products/${id}`,
        {
          name,
          description,
          price,
          image,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Product updated!");

      navigate("/admin/products");

    } catch (error) {

      toast.error(error.response?.data?.message || "Update error");

    }

  };

  return (

    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white flex justify-center items-center p-10">

      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8">

        <h1 className="text-4xl font-bold mb-8 text-center">
          ✏️ Edit Product
        </h1>

        <form
          onSubmit={updateProduct}
          className="space-y-5"
        >

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product name"
            className="w-full p-4 rounded-xl border dark:bg-gray-700"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            placeholder="Description"
            className="w-full p-4 rounded-xl border dark:bg-gray-700 resize-none"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Price"
            className="w-full p-4 rounded-xl border dark:bg-gray-700"
          />

          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
            className="w-full p-4 rounded-xl border dark:bg-gray-700"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 rounded-xl border dark:bg-gray-700"
          >

            <option value="">
              Select category
            </option>

            {categories.map((cat) => (

              <option
                key={cat._id}
                value={cat._id}
              >
                {cat.name}
              </option>

            ))}

          </select>

          {image && (

            <img
              src={image}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl border"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />

          )}

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-xl"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>

  );

}

export default EditProduct;