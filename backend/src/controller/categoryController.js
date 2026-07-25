import categoryService from "../services/categoryService.js";


const create = async(req,res)=>{

  try {

    const category =
      await categoryService.createCategory(req.body);


    res.status(201).json(category);


  } catch(error){

    res.status(400).json({
      message:error.message
    });

  }

};



const getAll = async(req,res)=>{

  const categories =
    await categoryService.getCategories();


  res.json(categories);

};



const getById = async(req,res)=>{

  const category =
    await categoryService.getCategoryById(
      req.params.id
    );


  res.json(category);

};



const update = async(req,res)=>{

  const category =
    await categoryService.updateCategory(
      req.params.id,
      req.body
    );


  res.json(category);

};



const remove = async(req,res)=>{

  await categoryService.deleteCategory(
    req.params.id
  );


  res.json({
    message:"Category deleted"
  });

};



export default {
  create,
  getAll,
  getById,
  update,
  remove
};