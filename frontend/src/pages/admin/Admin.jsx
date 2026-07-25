import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBox,
  FaTags,
  FaShoppingCart,
  FaUsers,
  FaDollarSign,
  FaArrowRight,
} from "react-icons/fa";
import api from "../../api/axios";

function Admin() {

  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });

  useEffect(() => {

    Promise.all([
    api.get("/products"),

    api.get("/categories"),

    api.get("/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),

    api.get("/customers", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }),

  ])
  .then(([products, categories, orders, users]) => {

    const revenue = orders.data.reduce(
      (sum, order) => sum + Number(order.totalPrice || 0),
      0
    );


    setStats({

      products: products.data.length,

      categories: categories.data.length,

      orders: orders.data.length,

      users: users.data.length,

      revenue,

    });

  })
  .catch((error) => {

    console.log("Dashboard error:", error);

  });


}, []);

  const cards = [
    {
      title: "Products",
      value: stats.products,
      icon: <FaBox size={28} />,
      color: "bg-blue-600",
    },
    {
      title: "Categories",
      value: stats.categories,
      icon: <FaTags size={28} />,
      color: "bg-purple-600",
    },
    {
      title: "Orders",
      value: stats.orders,
      icon: <FaShoppingCart size={28} />,
      color: "bg-green-600",
    },
    {
      title: "Users",
      value: stats.users,
      icon: <FaUsers size={28} />,
      color: "bg-orange-500",
    },
    {
      title: "Revenue",
      value: `$${stats.revenue}`,
      icon: <FaDollarSign size={28} />,
      color: "bg-red-500",
    },
  ];

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-10 transition-colors">

      <h1 className="text-5xl font-bold mb-10 text-gray-900 dark:text-white">
        📊 Dashboard
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className={`${card.color} text-white rounded-2xl shadow-xl p-6 hover:scale-105 transition`}
          >

            <div className="flex justify-between items-center">

              <div>

                <p className="text-lg opacity-80">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

              {card.icon}

            </div>

          </div>

        ))}

      </div>

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <Link
            to="/admin/products"
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex justify-between items-center hover:shadow-2xl transition"
          >
            <div>

              <h3 className="text-xl font-bold">
                Products
              </h3>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Manage all products
              </p>

            </div>

            <FaArrowRight />

          </Link>

          <Link
            to="/admin/categories"
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex justify-between items-center hover:shadow-2xl transition"
          >
            <div>

              <h3 className="text-xl font-bold">
                Categories
              </h3>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Manage categories
              </p>

            </div>

            <FaArrowRight />

          </Link>

          <Link
            to="/admin/orders"
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex justify-between items-center hover:shadow-2xl transition"
          >
            <div>

              <h3 className="text-xl font-bold">
                Orders
              </h3>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Manage customer orders
              </p>

            </div>

            <FaArrowRight />

          </Link>

        </div>

      </div>

    </div>

  );

}

export default Admin;