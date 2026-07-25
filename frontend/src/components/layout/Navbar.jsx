import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { CartContext } from "../../context/CartContext";

import {
  FaStore,
  FaUserCircle,
  FaShoppingCart,
  FaHeart,
  FaMoon,
  FaSun,
  FaBox,
  FaUserShield,
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

    <nav
      className="
      sticky top-0 z-50
      flex items-center justify-between
      px-8 py-4
      bg-white dark:bg-gray-950
      text-black dark:text-white
      border-b
      dark:border-gray-800
      shadow-md
      "
    >


      <Link
        to="/"
        className="flex items-center gap-2 text-2xl font-bold"
      >
        <FaStore />
        Shop
      </Link>



      <div className="flex items-center gap-7">


        <Link
          to="/"
          className="hover:text-blue-500"
        >
          Home
        </Link>



        {
          user && (

            <>


              <Link
                to="/products"
                className="hover:text-blue-500"
              >
                Products
              </Link>



              <Link
                to="/cart"
                className="
                relative
                text-xl
                hover:text-blue-500
                "
                title="Cart"
              >

                <FaShoppingCart />


                {
                  cart.length > 0 && (

                    <span
                      className="
                      absolute
                      -top-3
                      -right-3
                      bg-red-500
                      text-white
                      text-xs
                      w-5
                      h-5
                      rounded-full
                      flex
                      items-center
                      justify-center
                      "
                    >
                      {cart.length}
                    </span>

                  )
                }


              </Link>



              <Link
                to="/wishlist"
                className="text-xl hover:text-blue-500"
                title="Wishlist"
              >
                <FaHeart />
              </Link>



              <Link
                to="/my-orders"
                className="flex items-center gap-2 hover:text-blue-500"
              >
                <FaBox />
                Orders
              </Link>



              {
                user.role === "admin" && (

                  <Link
                    to="/admin"
                    className="flex items-center gap-2 hover:text-blue-500"
                  >
                    <FaUserShield />
                    Admin
                  </Link>

                )
              }


            </>

          )
        }




        {
          !user && (

            <>


              <Link
                to="/login"
                className="flex items-center gap-2 hover:text-blue-500"
              >
                <FaSignInAlt />
                Login
              </Link>



              <Link
                to="/register"
                className="flex items-center gap-2 hover:text-blue-500"
              >
                <FaUserPlus />
                Register
              </Link>


            </>

          )
        }


      </div>





      <div className="flex items-center gap-5">


        <button
          onClick={() => setDark(!dark)}
          className="text-xl hover:text-blue-500"
        >

          {
            dark
              ?
              <FaSun />
              :
              <FaMoon />
          }

        </button>




        {
          user && (

            <Link
              to="/profile"
              className="text-3xl hover:text-blue-500"
              title="Profile"
            >
              <FaUserCircle />
            </Link>

          )
        }


      </div>



    </nav>

  );

}


export default Navbar;