const userDb = require("../db/carDb");

const getAllCarsService = async (user, query) => {
  try {
    let results = await userDb.getAllCarsDb(user, query);
    return results;
  } catch (e) {
    const statusCode = e.statusCode || 500;
    throw new Error(statusCode);
  }
};

const getCarByIdService = async (id, user) => {
  try {
    let results = await userDb.getCarDbById(id, user);
    return results;
  } catch (e) {
    const statusCode = e.statusCode || 500;
    throw new Error(statusCode);
  }
}

const createCarService = async (body, id) => {
  try {
    let results = await userDb.createCarDb(body, id);
    return results;
  } catch (e) {
    const statusCode = 500;
    throw new Error(statusCode);
  }
};

const updateCarService = async (body, id) => {
  try {
    let results = await userDb.updateCarDb(body, id);
    return results;
  } catch (e) {
    const statusCode = 500;
    throw new Error(statusCode);
  }
};

const deleteCarService = async (id) => {
  try {
    let results = await userDb.deleteCarDb(id);
    return results;
  } catch (e) {
    const statusCode = 500;
    throw new Error(statusCode);
  }
};

module.exports = {
getAllCarsService,
getCarByIdService,
createCarService,
updateCarService,
deleteCarService
};
