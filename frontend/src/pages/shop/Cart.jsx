import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import api from "../../api/axios";
import toast from "react-hot-toast";

function Cart() {

  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = async () => {

    try {

      await api.post(
        "/orders",
        {
          products: cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          totalPrice: total,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Order created successfully!");

      clearCart();

    } catch (error) {

      toast.error(error.response?.data?.message || "Checkout error");

    }

  };

  return (

    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300 p-10">

      <h1 className="text-5xl font-bold mb-10">
        🛒 Cart
      </h1>

      {cart.length === 0 ? (

        <div className="text-center mt-20">

          <div className="text-8xl mb-5">
            🛒
          </div>

          <h2 className="text-3xl font-bold">
            Your cart is empty
          </h2>

        </div>

      ) : (

        <>

          <div className="space-y-5">

            {cart.map((item) => (

              <div
                key={item._id}
                className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 dark:text-gray-400">
                    Price: ${item.price}
                  </p>

                  <p className="font-semibold mt-1">
                    Total: ${item.price * item.quantity}
                  </p>

                </div>

                <div className="flex items-center gap-3">

                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-lg"
                  >
                    −
                  </button>

                  <span className="text-xl font-bold w-8 text-center">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded-lg"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                  >
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          <div className="mt-10 flex justify-between items-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

            <h2 className="text-3xl font-bold">
              Total: ${total}
            </h2>

            <button
              onClick={checkout}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition"
            >
              Checkout
            </button>

          </div>

        </>

      )}

    </div>

  );

}

export default Cart;