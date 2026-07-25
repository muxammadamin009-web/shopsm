import { useEffect, useState } from "react";
import { Select, Tag } from "antd";
import api from "../../../api/axios";
import toast from "react-hot-toast";

const { Option } = Select;

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  const getOrders = async () => {
    try {
      const res = await api.get("/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await api.put(
        `/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Status updated");
      getOrders();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColor = {
    pending: "gold",
    processing: "blue",
    delivered: "green",
    cancelled: "red",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-10">

      <h1 className="text-5xl font-bold mb-8">
        📦 Manage Orders
      </h1>

      <input
        type="text"
        placeholder="Search by customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-4 rounded-xl border dark:bg-gray-800 dark:border-gray-700 mb-8"
      />

      <div className="space-y-6">

        {filteredOrders.map((order) => (

          <div
            key={order._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6">

              <div>

                <h2 className="text-2xl font-bold">
                  👤 {order.user?.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  📧 {order.user?.email}
                </p>

                <p className="mt-3 text-lg font-semibold">
                  💰 Total: ${order.totalPrice}
                </p>

                <div className="mt-4">

                  <Tag
                    color={statusColor[order.status]}
                    className="text-sm px-3 py-1"
                  >
                    {order.status.toUpperCase()}
                  </Tag>

                </div>

              </div>

              <div>

                <Select
                  size="large"
                  value={order.status}
                  style={{ width: 220 }}
                  onChange={(value) =>
                    changeStatus(order._id, value)
                  }
                >
                  <Option value="pending">
                    🟡 Pending
                  </Option>

                  <Option value="processing">
                    🔵 Processing
                  </Option>

                  <Option value="delivered">
                    🚚 Delivered
                  </Option>

                  <Option value="cancelled">
                    ❌ Cancelled
                  </Option>

                </Select>

              </div>

            </div>

          </div>

        ))}

        {filteredOrders.length === 0 && (

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold">
              No orders found 📭
            </h2>

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminOrders;