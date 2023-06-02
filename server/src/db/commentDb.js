const promiseQuery = require("../helpers/promiseQuery");

const getAllCommentsByVehicleId = async (id) => {
  const values = [];
  try {
    values.push(id)
    const sqlQuery = `SELECT * FROM comments WHERE vehicle_id = ?`
    const getComments = await promiseQuery.promiseQueryFunc(sqlQuery, values);

    return {
      comments: getComments
    }

  } catch (e) {
    console.log(e);
    throw new Error(e.message)
  }
}


const createCommentDb = async (id, body) => {
    let values = [];
    try {
      values.push(id);
      values.push(body);

      const sqlQuery = `INSERT INTO comments (vehicle_id, comment,createdAt, updatedAt) VALUES (?,?, now(), now())`;
      const createPerson = await promiseQuery.promiseQueryFunc(sqlQuery, values);
      return {
        message: "Successfully saved!", 
        id: createPerson.insertId,
        affectedRows: createPerson.affectedRows
      }
    } catch (e) {
      console.log(e);
      throw new Error(e.message)
    }
  }

module.exports = {
    createCommentDb,
    getAllCommentsByVehicleId
}