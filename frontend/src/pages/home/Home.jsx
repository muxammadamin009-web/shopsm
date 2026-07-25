import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Carousel from "../../components/layout/Carousel";
import Categories from "../../components/category/Categories";
import ProductCard from "../../components/product/ProductCard";

import api from "../../api/axios";


function Home() {


  const [products,setProducts] = useState([]);



  const getProducts = async()=>{

    try{

      const res = await api.get("/products");

      setProducts(res.data.slice(0,8));

    }catch(error){

      console.log(error);

    }

  };



  useEffect(()=>{

    getProducts();

  },[]);



  return (


    <div
      className="
      min-h-screen
      bg-gray-50
      dark:bg-gray-900
      text-black
      dark:text-white
      "
    >



      <section
        className="
        max-w-7xl
        mx-auto
        px-8
        pt-8
        "
      >



        <div
          className="
          flex
          justify-center
          mb-5
          "
        >


          <input

            type="text"

            placeholder="Search products..."

            className="
            w-full
            max-w-xl
            px-6
            py-3
            rounded-full
            bg-white
            dark:bg-gray-800
            border
            dark:border-gray-700
            shadow
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "

          />


        </div>



        <Categories />


      </section>






      <section
        className="
        max-w-7xl
        mx-auto
        px-8
        py-8
        "
      >

        <Carousel />


      </section>







      <section
        className="
        max-w-7xl
        mx-auto
        px-8
        py-16
        "
      >



        <div
          className="
          flex
          justify-between
          items-center
          mb-8
          "
        >


          <h2
            className="
            text-3xl
            font-bold
            "
          >

            Popular Products

          </h2>



          <Link

            to="/products"

            className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-xl
            transition
            "

          >

            View All

          </Link>



        </div>






        <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-6
          "
        >


        {
          products.map(product=>(

            <ProductCard

              key={product._id}

              product={product}

            />

          ))
        }


        </div>



      </section>








      <section
        className="
        bg-blue-600
        text-white
        py-16
        "
      >



        <div
          className="
          max-w-7xl
          mx-auto
          px-8
          grid
          md:grid-cols-3
          gap-10
          text-center
          "
        >



          <div>

            <div className="text-5xl">
              🚚
            </div>

            <h3 className="text-2xl font-bold mt-3">
              Fast Delivery
            </h3>

            <p className="opacity-80 mt-2">
              Quick delivery to your home
            </p>

          </div>





          <div>

            <div className="text-5xl">
              🔒
            </div>

            <h3 className="text-2xl font-bold mt-3">
              Secure Payment
            </h3>

            <p className="opacity-80 mt-2">
              Safe payment system
            </p>

          </div>





          <div>

            <div className="text-5xl">
              ⭐
            </div>

            <h3 className="text-2xl font-bold mt-3">
              Best Products
            </h3>

            <p className="opacity-80 mt-2">
              Quality products only
            </p>

          </div>



        </div>



      </section>






      <section
        className="
        max-w-7xl
        mx-auto
        px-8
        py-20
        text-center
        "
      >


        <h2
          className="
          text-4xl
          font-bold
          "
        >

          Stay Updated

        </h2>



        <p
          className="
          text-gray-500
          dark:text-gray-400
          mt-3
          mb-8
          "
        >

          Subscribe for new products and discounts

        </p>





        <div
          className="
          flex
          max-w-xl
          mx-auto
          gap-3
          "
        >


          <input

            type="email"

            placeholder="Email address"

            className="
            flex-1
            px-5
            py-3
            rounded-xl
            border
            dark:bg-gray-800
            dark:border-gray-700
            "

          />



          <button

            className="
            bg-blue-600
            hover:bg-blue-700
            px-7
            rounded-xl
            text-white
            "

          >

            Subscribe

          </button>



        </div>



      </section>




    </div>


  );

}


export default Home;