const commentDb = require("../db/commentDb");

const getCommentsbyIdService = async (id) => {
  try {
    let results = await commentDb.getAllCommentsByVehicleId(id);
    return results;
  } catch (e) {
    const statusCode = 500;
    console.log(e);
    throw new Error(statusCode);
  }
}


const createCommentService = async (id ,body) => {
    try {
      let results = await commentDb.createCommentDb(id, body);
      return results;
    } catch (e) {
      const statusCode = 500;
      console.log(e);
      throw new Error(statusCode);
    }
  };

module.exports = {
    createCommentService,
    getCommentsbyIdService
}