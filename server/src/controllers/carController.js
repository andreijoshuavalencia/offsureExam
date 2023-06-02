const userService = require("../services/carService");

const getAllCarsController = async (req, res) => {
  
  let { user, query } = req;
  try {
    let results = await userService.getAllCarsService(user, query);
    res.status(200).json(results);
  } catch (e) {
    const statusCode = e.statusCode || 500;
    res.status(statusCode).json({
      message: e.message,
    });
  }
};

const getCarByIdController = async (req, res) => {
  let { id } = req.params;
  try {
    let results = await userService.getCarByIdService(id);
    res.status(200).json(results);
  } catch (e) {
    const statusCode = e.statusCode || 500;
    res.status(statusCode).json({
      message: e.message,
    });
  }
}

const createCarController = async (req, res) => {
  let { body } = req;
  console.log(body);
  const id = body.id;
  try {
    let results = await userService.createCarService(body, id);
    res.status(200).json(results);
  } catch (e) {
    const statusCode = e.statusCode || 500;
    res.status(statusCode).json({
      message: e.message,
    });
  }
};

const updateCarController = async (req, res) => {
  let { body, params } = req;
  try {
    let results = await userService.updateCarService(body, params.id);
    res.status(200).json(results);
  } catch (e) {
    const statusCode = e.statusCode || 500;
    res.status(statusCode).json({
      message: e.message,
    });
  }
};

const deleteCarController = async (req, res) => {
  let { params } = req;
  try {
    let results = await userService.deleteCarService(params.id);
    res.status(200).json(results);
  } catch (e) {
    const statusCode = e.statusCode || 500;
    res.status(statusCode).json({
      message: e.message,
    });
  }
};

module.exports = {
  getAllCarsController,
  getCarByIdController,
  createCarController,
  updateCarController,
  deleteCarController,
};
