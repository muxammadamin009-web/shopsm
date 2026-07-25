import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {

    e.preventDefault();

    try {

      const res = await api.post("/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Successfully logged in!");

      navigate("/products");

    } catch (error) {

      toast.error(error.response?.data?.message || "Login error");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      <form
        onSubmit={login}
        className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8"
      >

        <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
          🔐 Login
        </h1>

        <input
          className="w-full p-4 mb-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-black dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-4 mb-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-black dark:text-white outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition"
        >
          Login
        </button>

        <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>

      </form>

    </div>

  );

}

export default Login;