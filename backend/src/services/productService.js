
import Product from "../models/productModels.js";






const createProduct = async (data) => {
  const product = await Product.create(data);
  return product;
};

const getProducts = async () => {
  return await Product.find().populate("category");
};

const getProductById = async (id) => {
  return await Product.findById(id).populate("category");
};

const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

const getProductsByCategory = async (categoryId) => {

  const products = await Product.find({
    category: categoryId
  }).populate("category");


  return products;

};


export default {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory
};