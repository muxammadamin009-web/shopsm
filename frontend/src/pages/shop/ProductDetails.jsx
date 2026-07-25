import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../../api/axios.js";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

function ProductDetails() {

  const { id } = useParams();

  const { addToCart } = useContext(CartContext);

  const {
    toggleWishlist,
    isLiked,
  } = useContext(WishlistContext);

  const [product, setProduct] = useState(null);

  useEffect(() => {

    api.get(`/products/${id}`)
      .then((res) => {

        setProduct(res.data);

      })
      .catch(console.log);

  }, [id]);

  if (!product) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 text-black dark:text-white">

        <h1 className="text-4xl font-bold animate-pulse">
          Loading...
        </h1>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-10 transition-colors">

      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-3xl overflow-hidden">

        <div className="grid grid-cols-1 md:grid-cols-2">

          <div className="relative">

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />

            <button
              onClick={() => toggleWishlist(product)}
              className="absolute top-5 right-5 text-5xl"
            >
              {isLiked(product._id) ? "❤️" : "🤍"}
            </button>

          </div>

          <div className="p-10 flex flex-col justify-center">

            <h1 className="text-5xl font-bold mb-6">
              {product.name}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-8">
              {product.description}
            </p>

            <h2 className="text-4xl font-bold mt-10 text-green-600">
              ${product.price}
            </h2>

            <button
              onClick={() => addToCart(product)}
              className="mt-10 bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white px-8 py-4 rounded-xl text-lg transition"
            >
              🛒 Add to Cart
            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ProductDetails;