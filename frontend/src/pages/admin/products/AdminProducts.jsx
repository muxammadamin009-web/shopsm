import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api/axios";
import toast from "react-hot-toast";

function AdminProducts() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const getProducts = async () => {

    try {

      const res = await api.get("/products");

      setProducts(res.data);

    } catch (error) {

      toast.error(error.response?.data?.message || "Failed to fetch products");

    }

  };

  useEffect(() => {

    getProducts();

  }, []);

  const deleteProduct = async (id) => {

    if (!window.confirm("Delete this product?")) return;

    try {

      await api.delete(
        `/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      getProducts();

    } catch (error) {

      toast.error(error.response?.data?.message || "Failed to delete product");

    }

  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-10 transition-colors">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-5xl font-bold">
          📦 Manage Products
        </h1>

        <Link
          to="/admin/create-product"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
        >
          + Add Product
        </Link>

      </div>

      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-xl border dark:bg-gray-800 dark:border-gray-700 mb-8"
      />

      <div className="space-y-5">

        {filteredProducts.map((product) => (

          <div
            key={product._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 flex justify-between items-center"
          >

            <div className="flex items-center gap-5">

              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 rounded-xl object-cover"
              />

              <div>

                <h2 className="text-2xl font-bold">
                  {product.name}
                </h2>

                <p className="text-gray-500 dark:text-gray-400">
                  ${product.price}
                </p>

              </div>

            </div>

            <div className="flex gap-3">

              <Link
                to={`/admin/products/edit/${product._id}`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition"
              >
                Edit
              </Link>

              <button
                onClick={() => deleteProduct(product._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

        {filteredProducts.length === 0 && (

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold">
              No products found 😢
            </h2>

          </div>

        )}

      </div>

    </div>

  );

}

export default AdminProducts;