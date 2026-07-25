import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";


function Verify() {

  const {
    register,
    handleSubmit,
  } = useForm();


  const navigate = useNavigate();

  const location = useLocation();


  const email =
    location.state?.email ||
    localStorage.getItem("verifyEmail") ||
    "";



  const [timer, setTimer] = useState(0);



  const onSubmit = async (data) => {

    try {


      const res = await api.post(
        "/auth/verify",
        {
          email: data.email,
          code: data.code,
        }
      );



      localStorage.setItem(
        "token",
        res.data.token
      );



      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );


      localStorage.removeItem(
        "verifyEmail"
      );


      toast.success(
        "Email verified!"
      );


      navigate("/products");



    } catch (error) {


      console.log(
        error.response?.data
      );


      toast.error(
        error.response?.data?.message ||
        "Verification failed"
      );


    }

  };





  const resendCode = async () => {


    if (timer > 0) return;



    try {


      await api.post(
        "/auth/resend",
        {
          email,
        }
      );



      toast.success(
        "New code sent!"
      );



      setTimer(60);



      const interval = setInterval(() => {


        setTimer((prev) => {


          if (prev <= 1) {

            clearInterval(interval);

            return 0;

          }


          return prev - 1;


        });


      }, 1000);



    } catch(error) {


      toast.error(
        error.response?.data?.message ||
        "Failed to resend code"
      );


    }

  };





  return (

    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      dark:bg-gray-950
      px-4
      "
    >


      <form

        onSubmit={handleSubmit(onSubmit)}

        className="
        w-full
        max-w-md
        bg-white
        dark:bg-gray-900
        p-8
        rounded-2xl
        shadow-xl
        "

      >


        <h1
          className="
          text-3xl
          font-bold
          text-center
          mb-6
          text-black
          dark:text-white
          "
        >
          Verify Email
        </h1>




        <input

          {...register("email")}

          defaultValue={email}

          type="email"

          placeholder="Email"

          className="
          w-full
          p-4
          mb-4
          rounded-xl
          border
          dark:border-gray-700
          bg-white
          dark:bg-gray-800
          text-black
          dark:text-white
          "

        />




        <input

          {...register("code")}

          placeholder="6-digit code"

          maxLength={6}

          className="
          w-full
          p-4
          mb-4
          rounded-xl
          border
          dark:border-gray-700
          bg-white
          dark:bg-gray-800
          text-black
          dark:text-white
          text-center
          tracking-[10px]
          text-2xl
          "

        />





        <button

          className="
          w-full
          bg-blue-600
          hover:bg-blue-700
          text-white
          p-4
          rounded-xl
          transition
          "

        >

          Verify

        </button>





        <button

          type="button"

          onClick={resendCode}

          disabled={timer > 0}

          className="
          w-full
          mt-4
          bg-gray-200
          dark:bg-gray-700
          text-black
          dark:text-white
          p-3
          rounded-xl
          disabled:opacity-50
          "

        >

          {
            timer > 0
            ? `Resend code in ${timer}s`
            : "Didn't receive code? Resend"
          }


        </button>



      </form>


    </div>

  );

}


export default Verify;