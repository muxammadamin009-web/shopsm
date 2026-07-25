import customerService from "../services/customerService.js";


const create = async (req, res) => {
  try {

    const customer = await customerService.createCustomer({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json(customer);

  } catch(error){

    res.status(400).json({
      message:error.message
    });

  }
};



const getAll = async(req,res)=>{

  const customers = await customerService.getCustomers();

  res.json(customers);

};



const getById = async(req,res)=>{

  const customer = await customerService.getCustomerById(
    req.params.id
  );

  res.json(customer);

};



const update = async(req,res)=>{

  const customer = await customerService.updateCustomer(
    req.params.id,
    req.body
  );

  res.json(customer);

};



const remove = async(req,res)=>{

  await customerService.deleteCustomer(
    req.params.id
  );

  res.json({
    message:"Customer deleted"
  });

};



export default {
  create,
  getAll,
  getById,
  update,
  remove
};