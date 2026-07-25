import productService from "../services/productService.js";




const getByCategory = async (req, res) => {
  try {

    const products = await productService.getProductsByCategory(
      req.params.id
    );

    res.json(products);

  } catch(error) {

    res.status(400).json({
      message: error.message
    });

  }
};  




const create = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const getAll = async (req, res) => {
  const products = await productService.getProducts();
  res.json(products);
};

const getById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    res.json(product);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const remove = async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);

    res.json({
      message: "Product deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default {
  create,
  getAll,
  getById,
  update,
  remove,
  getByCategory,
};