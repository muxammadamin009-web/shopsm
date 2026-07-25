import { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishlistContext";

function ProductCard({ product }) {

  const { addToCart } = useContext(CartContext);

  const {
    toggleWishlist,
    isLiked,
  } = useContext(WishlistContext);

  return (

    <div className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">

      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-4 right-4 text-3xl z-10 hover:scale-125 transition"
      >
        {isLiked(product._id) ? "❤️" : "🤍"}
      </button>

      <Link to={`/products/${product._id}`}>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />

        <div className="p-5">

          <h2 className="text-2xl font-bold mb-2 dark:text-white">
            {product.name}
          </h2>

          <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
            {product.description}
          </p>

        </div>

      </Link>

      <div className="flex justify-between items-center p-5 border-t border-gray-200 dark:border-gray-700">

        <span className="text-2xl font-bold text-blue-600">
          ${product.price}
        </span>

        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
        >
          Add to Cart
        </button>

      </div>

    </div>

  );

}

export default ProductCard;