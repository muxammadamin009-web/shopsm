import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  FaUserCircle,
  FaEnvelope,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";


function Profile() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));


  const logout = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );


    if (!confirmLogout) return;


    localStorage.removeItem("token");
    localStorage.removeItem("user");


    toast.success("Logged out successfully!");


    navigate("/login");

  };



  return (

    <div
      className="
      min-h-screen
      bg-white
      dark:bg-gray-900
      text-black
      dark:text-white
      p-10
      "
    >


      <div
        className="
        max-w-xl
        mx-auto
        bg-white
        dark:bg-gray-800
        shadow-xl
        rounded-2xl
        p-8
        "
      >


        <div className="flex justify-center mb-6">

          <FaUserCircle
            className="text-8xl text-blue-500"
          />

        </div>



        <h1 className="text-4xl font-bold text-center mb-8">
          Profile
        </h1>




        <div className="space-y-5">


          <div className="flex items-center gap-3">

            <FaUserCircle className="text-blue-500 text-xl" />

            <p>
              <strong>Name:</strong> {user?.name}
            </p>

          </div>



          <div className="flex items-center gap-3">

            <FaEnvelope className="text-blue-500 text-xl" />

            <p>
              <strong>Email:</strong> {user?.email}
            </p>

          </div>



          <div className="flex items-center gap-3">

            <FaUserShield className="text-blue-500 text-xl" />

            <p>
              <strong>Role:</strong> {user?.role}
            </p>

          </div>



        </div>




        <button

          onClick={logout}

          className="
          mt-8
          w-full
          flex
          items-center
          justify-center
          gap-3
          bg-red-600
          hover:bg-red-700
          text-white
          py-3
          rounded-xl
          transition
          "

        >

          <FaSignOutAlt />

          Logout

        </button>



      </div>


    </div>

  );

}


export default Profile; 