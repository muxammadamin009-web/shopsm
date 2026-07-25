import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios.js";
import ProductCard from "../../components/product/ProductCard.jsx";
import toast from "react-hot-toast";

function CategoryProducts() {

  const { id } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {

    api
      .get(`/products/category/${id}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to fetch products");
      });

  }, [id]);

  return (

    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 p-10">

      <h1 className="text-5xl font-bold mb-10">
        📂 Category Products
      </h1>

      {products.length === 0 ? (

        <div className="text-center mt-20">

          <div className="text-8xl mb-4">
            📦
          </div>

          <h2 className="text-3xl font-bold">
            No products found
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-3">
            There are no products in this category.
          </p>

        </div>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map((product) => (

            <ProductCard
              key={product._id}
              product={product}
            />

          ))}

        </div>

      )}

    </div>

  );

}

export default CategoryProducts;