import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";


function Categories() {


  const [categories, setCategories] = useState([]);



  const getCategories = async () => {

    try {

      const res = await api.get("/categories");

      setCategories(res.data);

    } catch (error) {

      console.log(error);

    }

  };



  useEffect(() => {

    getCategories();

  }, []);




  return (

    <div
      className="
      flex
      justify-center
      items-center
      flex-wrap
      gap-3
      py-4
      "
    >

      {
        categories.map((category) => (

          <Link

            key={category._id}

            to={`/category/${category._id}`}

            className="
            whitespace-nowrap
            px-4
            py-1.5
            rounded-full
            text-xs
            font-semibold
            bg-white
            dark:bg-gray-800
            text-gray-700
            dark:text-gray-200
            border
            border-gray-200
            dark:border-gray-700
            hover:bg-blue-600
            hover:text-white
            hover:border-blue-600
            transition
            duration-300
            shadow-sm
            "

          >

            {category.name}

          </Link>

        ))
      }


    </div>

  );

}


export default Categories;