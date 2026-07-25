import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";

function Register() {

  const {
    register,
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {

    try {

      await api.post("/auth/register", data);

      toast.success("Verification code sent!");

      navigate("/verify", {
        state: {
          email: data.email,
        },
      });

    } catch (error) {

      console.log(error.response?.data);

      toast.error(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8"
      >

        <h1 className="text-4xl font-bold text-center mb-8 text-black dark:text-white">
          Register
        </h1>

        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          className="w-full p-4 mb-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-black dark:text-white"
        />

        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-black dark:text-white"
        />

        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 text-black dark:text-white"
        />

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl transition"
        >
          Register
        </button>

        <p className="text-center mt-6 text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>

      </form>

    </div>

  );

}

export default Register;