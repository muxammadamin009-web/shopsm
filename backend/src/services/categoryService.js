import Category from "../models/categoryModels.js";


const createCategory = async (data) => {

  const exist = await Category.findOne({
    name: data.name
  });

  if (exist) {
    throw new Error("Category already exists");
  }


  return await Category.create(data);

};



const getCategories = async () => {

  return await Category.find();

};



const getCategoryById = async (id) => {

  return await Category.findById(id);

};



const updateCategory = async (id, data) => {

  return await Category.findByIdAndUpdate(
    id,
    data,
    {
      new: true
    }
  );

};



const deleteCategory = async (id) => {

  return await Category.findByIdAndDelete(id);

};



export default {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};