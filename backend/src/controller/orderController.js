import orderService from "../services/orderService.js";

const create = async (req, res) => {
  try {
    const order = await orderService.createOrder({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const orders = await orderService.getOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const myOrders = async (req, res) => {
  try {
    const orders = await orderService.getMyOrders(req.user.id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status
    );

    res.json(order);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default {
  create,
  getAll,
  myOrders,
  updateStatus,
};