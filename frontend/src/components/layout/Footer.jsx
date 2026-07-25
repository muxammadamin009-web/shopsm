import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaGithub,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";


function Footer() {


  return (

    <footer
      className="
      bg-gray-100
      dark:bg-gray-950
      text-gray-700
      dark:text-gray-300
      border-t
      dark:border-gray-800
      mt-10
      "
    >


      <div
        className="
        max-w-7xl
        mx-auto
        px-8
        py-12
        grid
        grid-cols-1
        md:grid-cols-4
        gap-10
        "
      >




        <div>

          <h2
            className="
            text-3xl
            font-bold
            text-black
            dark:text-white
            mb-4
            "
          >
            🛒 Shop
          </h2>


          <p>
            Your favorite online store.
            Quality products and fast delivery.
          </p>


        </div>






        <div>


          <h3
            className="
            text-xl
            font-bold
            text-black
            dark:text-white
            mb-4
            "
          >
            Links
          </h3>


          <div className="flex flex-col gap-3">


            <Link
              to="/"
              className="hover:text-blue-500"
            >
              Home
            </Link>


            <Link
              to="/products"
              className="hover:text-blue-500"
            >
              Products
            </Link>


            <Link
              to="/cart"
              className="hover:text-blue-500"
            >
              Cart
            </Link>


            <Link
              to="/profile"
              className="hover:text-blue-500"
            >
              Profile
            </Link>


          </div>


        </div>





     

        <div>


          <h3
            className="
            text-xl
            font-bold
            text-black
            dark:text-white
            mb-4
            "
          >
            Contact
          </h3>


          <div className="flex flex-col gap-4">


            <p className="flex items-center gap-3">
              <FaPhone />
              +998 97 097 44 77
            </p>


            <p className="flex items-center gap-3">
              <FaEnvelope />
              muxammadamin009@gmail.com
            </p>


            <p className="flex items-center gap-3">
              <FaMapMarkerAlt />
              Uzbekistan
            </p>


          </div>


        </div>





       

        <div>


          <h3
            className="
            text-xl
            font-bold
            text-black
            dark:text-white
            mb-4
            "
          >
            Follow us
          </h3>



          <div
            className="
            flex
            gap-5
            text-3xl
            "
          >


            <FaFacebook
              className="hover:text-blue-500 cursor-pointer"
            />


            <FaInstagram
              className="hover:text-pink-500 cursor-pointer"
            />


            <FaTelegram
              className="hover:text-blue-400 cursor-pointer"
              link="https://t.me/shopmsms88_bot"
            />


            <FaGithub
              className="hover:text-black dark:hover:text-white cursor-pointer"
            />


          </div>


        </div>



      </div>




      <div
        className="
        border-t
        dark:border-gray-800
        py-5
        text-center
        "
      >

        © 2026 Shop. All rights reserved.

      </div>



    </footer>

  );

}


export default Footer;