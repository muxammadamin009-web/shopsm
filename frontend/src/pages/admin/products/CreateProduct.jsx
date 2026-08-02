import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import toast from "react-hot-toast";

function CreateProduct() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    api
      .get("/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message ||
            "Failed to fetch categories"
        );
      });

  }, []);

  const createProduct = async (e) => {

    e.preventDefault();

    try {

      let imageUrl = "";

      if (image) {

        const formData = new FormData();

        formData.append("image", image);

        const upload = await api.post(
          "/upload",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = upload.data.url;

      }

      await api.post(
        "/products",
        {
          name,
          description,
          price,
          image: imageUrl,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Product created successfully!");

      navigate("/admin/products");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );

    }

  };

  return (

    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 flex justify-center items-center p-10">

      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">

        <h1 className="text-4xl font-bold mb-8 text-center">
          ➕ Create Product
        </h1>

        <form
          onSubmit={createProduct}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 outline-none"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            rows={5}
            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 outline-none resize-none"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 outline-none"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700"
          />

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 outline-none"
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
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="w-full h-64 object-cover rounded-xl border"
            />

          )}

          <button
            className="w-full bg-green-600 hover:bg-green-700 transition text-white p-4 rounded-xl font-semibold"
          >
            Create Product
          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateProduct;