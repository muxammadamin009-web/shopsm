import { useEffect, useState } from "react";
import api from "../../api/axios.js";
import ProductCard from "../../components/product/ProductCard.jsx";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";


function Products() {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");


  const getProducts = async (categoryId = "") => {

    try {

      const url = categoryId
        ? `/products/category/${categoryId}`
        : "/products";


      const res = await api.get(url);

      setProducts(res.data);


    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch products"
      );

    }

  };



  useEffect(() => {

    getProducts();


    api
      .get("/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch(console.log);


  }, []);



  useEffect(() => {

    const timer = setTimeout(() => {

      setQuery(search);

    }, 500);



    return () => clearTimeout(timer);


  }, [search]);



  const filterCategory = (id) => {

    setSelectedCategory(id);

    getProducts(id);

  };



  const filteredProducts = products.filter((product) => {

    const text =
      `${product.name} ${product.description}`
      .toLowerCase();


    return text.includes(query.toLowerCase());

  });



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


      <h1 className="text-5xl font-bold mb-8">
        Products
      </h1>



      <div className="relative mb-8">


        <FaSearch
          className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-gray-400
          "
        />


        <input

          type="text"

          placeholder="Search products..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="
          w-full
          pl-12
          p-4
          rounded-xl
          border
          border-gray-300
          dark:border-gray-700
          bg-white
          dark:bg-gray-800
          text-black
          dark:text-white
          outline-none
          focus:ring-2
          focus:ring-blue-500
          "

        />


      </div>




      <div className="flex flex-wrap gap-3 mb-10">


        <button

          onClick={() => filterCategory("")}

          className={`
          px-5
          py-2
          rounded-xl
          transition
          ${
            selectedCategory === ""
            ?
            "bg-blue-600 text-white"
            :
            "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300"
          }
          `}

        >
          All
        </button>



        {
          categories.map((category)=>(


            <button

              key={category._id}

              onClick={() => filterCategory(category._id)}

              className={`
              px-5
              py-2
              rounded-xl
              transition
              ${
                selectedCategory === category._id
                ?
                "bg-blue-600 text-white"
                :
                "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300"
              }
              `}

            >

              {category.name}

            </button>


          ))
        }


      </div>




      {
        filteredProducts.length === 0 ? (


          <div className="
          text-center
          text-2xl
          text-gray-500
          mt-20
          ">

            No products found


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
              filteredProducts.map((product)=>(


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


export default Products;