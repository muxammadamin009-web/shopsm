import Customer from "../models/customerModel.js";


const createCustomer = async (data) => {
  return await Customer.create(data);
};


const getCustomers = async () => {
  return await Customer.find().populate("user");
};


const getCustomerById = async (id) => {
  return await Customer.findById(id).populate("user");
};


const updateCustomer = async (id, data) => {
  return await Customer.findByIdAndUpdate(
    id,
    data,
    {
      new: true
    }
  );
};


const deleteCustomer = async (id) => {
  return await Customer.findByIdAndDelete(id);
};


export default {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};  