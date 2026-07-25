import { useEffect, useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { FaBoxOpen } from "react-icons/fa";

function MyOrders() {

  const [orders, setOrders] = useState([]);


  useEffect(() => {

    api.get("/orders/my", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {

      setOrders(res.data);

    })
    .catch((error) => {

      toast.error(
        error.response?.data?.message ||
        "Failed to fetch orders"
      );

    });

  }, []);



  return (

    <div className="
      min-h-screen 
      bg-white dark:bg-gray-900 
      text-black dark:text-white 
      p-10
      transition-colors
    ">
      <h1 className="text-5xl font-bold mb-10 flex items-center gap-3">
     <FaBoxOpen />
        My Orders
        </h1>



       



      {
        orders.length === 0 ? (

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold flex justify-center items-center gap-3">
              <FaBoxOpen />
          You don't have any orders yet
               </h2>
          </div>


        ) : (


          <div className="space-y-6">


            {
              orders.map((order) => (


                <div
                  key={order._id}
                  className="
                    bg-white 
                    dark:bg-gray-800
                    rounded-2xl
                    shadow-lg
                    p-6
                  "
                >



                  <div className="
                    flex 
                    justify-between 
                    items-center 
                    mb-4
                  ">


                    <h2
                      className={`
                        text-2xl 
                        font-bold
                        ${
                          order.status === "Completed"
                          ? "text-green-500"
                          : "text-yellow-500"
                        }
                      `}
                    >

                      {order.status}

                    </h2>



                    <span className="text-xl font-bold">

                      ${order.totalPrice}

                    </span>


                  </div>





                  <div className="space-y-3">


                    {
                      order.products.map((item, index) => (


                        <div
                          key={
                            item.product?._id || index
                          }
                          className="
                            flex 
                            justify-between
                            border-b
                            border-gray-200
                            dark:border-gray-700
                            pb-2
                          "
                        >


                          <span>

                            {
                              item.product?.name ||
                              "Product deleted"
                            }

                          </span>



                          <span>

                            x{item.quantity}

                          </span>


                        </div>


                      ))
                    }


                  </div>



                </div>


              ))
            }


          </div>


        )
      }


    </div>

  );

}


export default MyOrders;