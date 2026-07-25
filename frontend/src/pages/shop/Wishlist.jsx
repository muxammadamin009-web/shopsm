import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import ProductCard from "../../components/product/ProductCard.jsx";

import {
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";


function Wishlist() {

  const { wishlist } = useContext(WishlistContext);


  return (

    <div
      className="
      min-h-screen
      bg-white
      dark:bg-gray-900
      text-black
      dark:text-white
      transition-colors
      duration-300
      p-10
      "
    >


      <h1 className="text-5xl font-bold mb-10 flex items-center gap-3">

        <FaHeart className="text-red-500" />

        Wishlist

      </h1>



      {
        wishlist.length === 0 ? (


          <div
            className="
            flex
            flex-col
            items-center
            justify-center
            mt-24
            "
          >


            <FaRegHeart
              className="
              text-8xl
              text-gray-400
              mb-5
              "
            />



            <h2 className="text-3xl font-bold">

              Wishlist is empty

            </h2>



            <p className="text-gray-500 dark:text-gray-400 mt-3">

              Add products to your favourites.

            </p>



          </div>


        ) : (


          <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8
            "
          >


            {
              wishlist.map((product)=>(


                <ProductCard

                  key={product._id}

                  product={product}

                />


              ))
            }


          </div>


        )
      }



    </div>

  );

}


export default Wishlist;