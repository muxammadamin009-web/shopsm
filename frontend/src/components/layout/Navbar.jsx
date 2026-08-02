import { Link } from "react-router-dom";
import { useContext } from "react";

import { ThemeContext } from "../../context/ThemeContext";
import { CartContext } from "../../context/CartContext";

import {
  FaHome,
  FaBox,
  FaClipboardList,
  FaUserShield,
  FaShoppingCart,
  FaHeart,
  FaMoon,
  FaSun,
  FaUserCircle,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

function Navbar() {

  const { dark, setDark } = useContext(ThemeContext);

  const { cart } = useContext(CartContext);

  const userString = localStorage.getItem("user");

  const user =
    userString && userString !== "undefined"
      ? JSON.parse(userString)
      : null;

  return (

    <nav className="flex justify-center mt-6 sticky top-5 z-50">

      <div
        className="
        w-[94%]
        max-w-7xl
        h-24
        bg-white
        dark:bg-gray-900
        rounded-[45px]
        shadow-2xl
        px-10
        flex
        items-center
        justify-between
        transition-all
        "
      >


        <Link
          to="/"
          className="flex items-center"
        >

          <img
            src="/logo.png"
            alt="ShopSM"
            className="h-14 object-contain"
          />

        </Link>

        <div className="flex items-center gap-10">

          <Link
            to="/"
            className="text-2xl hover:text-blue-500 hover:scale-110 transition"
          >
            <FaHome />
          </Link>

          {user && (

            <>
              <Link
                to="/products"
                className="text-2xl hover:text-blue-500 hover:scale-110 transition"
              >
                <FaBox />
              </Link>

              <Link
                to="/my-orders"
                className="text-2xl hover:text-blue-500 hover:scale-110 transition"
              >
                <FaClipboardList />
              </Link>

              {user.role === "admin" && (

                <Link
                  to="/admin"
                  className="text-2xl hover:text-blue-500 hover:scale-110 transition"
                >
                  <FaUserShield />
                </Link>

              )}

            </>

          )}

          {!user && (

            <>
              <Link
                to="/login"
                className="text-2xl hover:text-blue-500 hover:scale-110 transition"
              >
                <FaSignInAlt />
              </Link>

              <Link
                to="/register"
                className="text-2xl hover:text-blue-500 hover:scale-110 transition"
              >
                <FaUserPlus />
              </Link>
            </>

          )}

        </div>

        {/* RIGHT */}

        <div className="flex items-center gap-6">

          {user && (

            <Link
              to="/wishlist"
              className="text-2xl hover:text-red-500 hover:scale-110 transition"
            >
              <FaHeart />
            </Link>

          )}

          {user && (

            <Link
              to="/cart"
              className="
              relative
              text-2xl
              hover:text-blue-500
              hover:scale-110
              transition
              "
            >

              <FaShoppingCart />

              {cart.length > 0 && (

                <span
                  className="
                  absolute
                  -top-2
                  -right-2
                  w-5
                  h-5
                  rounded-full
                  bg-red-500
                  text-white
                  text-xs
                  flex
                  items-center
                  justify-center
                  "
                >
                  {cart.length}
                </span>

              )}

            </Link>

          )}

          <button
            onClick={() => setDark(!dark)}
            className="text-2xl hover:text-yellow-500 hover:scale-110 transition"
          >

            {dark ? <FaSun /> : <FaMoon />}

          </button>

          {user && (

            <Link
              to="/profile"
              className="text-3xl hover:text-blue-500 hover:scale-110 transition"
            >
              <FaUserCircle />
            </Link>

          )}

        </div>

      </div>

    </nav>

  );

}

export default Navbar;