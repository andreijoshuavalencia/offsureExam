const promiseQuery = require("../helpers/promiseQuery");

const getAllCarsDb = async (user, query) => {
  const sqlQuery = `SELECT * FROM vehicles`;
  let values = [];
  const carsList = await promiseQuery.promiseQueryFunc(sqlQuery, values);

  return {
    cars: carsList
  }
};

const getCarDbById = async (id) => {
  // continue here
  try {
    const sqlQuery = `SELECT vehicles.id, vehicles.year, vehicles.make, vehicles.model, vehicles.price,
    vehicles.isDealer, person.name, person.phone, person.email
    FROM person 
    INNER JOIN vehicles ON person.id = vehicles.person_id
    WHERE vehicles.id = ?; `;

    const carsList = await promiseQuery.promiseQueryFunc(sqlQuery, id);
    return {
      cars: carsList
    }
  } catch (e) {
    console.log(e);
    throw new Error(e.message)
  }

}

const createCarDb = async (body, id) => {
  let values = [];
  let {year, make, model, price, isDealer} = body;
  try {
    values.push(id);
    values.push(year);
    values.push(make);
    values.push(model);
    values.push(price);
    values.push(isDealer);
    const sqlQuery = `INSERT INTO vehicles (person_id, year, make, model, price, isDealer, createdAt, updatedAt) VALUES (?,?,?,?,?,?, now(), now())`;
    const createCar = await promiseQuery.promiseQueryFunc(sqlQuery, values);
    return {
      message: "Successfully saved!", 
      id: createCar.insertId,
      affectedRows: createCar.affectedRows
    }
  } catch (e) {
    console.log(e);
    throw new Error(e.message)
  }
}

const updateCarDb = async (body, id) => {
  let values = [];
  let {first_name, last_name} = body; 
  try {
    const sqlQuery = ``
    values.push(first_name);
    values.push(last_name);
    values.push(id);

    const updateUser = await promiseQuery.promiseQueryFunc(sqlQuery, values);
    return {
      message: "Successfully Updated Car Details",
      affectedRows: updateUser.affectedRows
  }
  }catch (e) {
    throw new Error(e.message)
  }
}

const deleteCarDb = async (id) => {

  try {
    let sqlQuery = `DELETE FROM comments WHERE vehicle_id = ?`
    const deleteUser = await promiseQuery.promiseQueryFunc(sqlQuery, id);

    sqlQuery = `DELETE FROM vehicles WHERE id = ?`
    await promiseQuery.promiseQueryFunc(sqlQuery, id);
    return {
      message: "Successfully deleted car.",
      affectedRows: deleteUser.affectedRows
    }
  }catch (e) {
    console.log(e);
  }


}


module.exports = {
    getAllCarsDb,
    getCarDbById,
    createCarDb,
    updateCarDb,
    deleteCarDb
}