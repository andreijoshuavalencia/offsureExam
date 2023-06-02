const promiseQuery = require("../helpers/promiseQuery");

const getPersonDb = async (body) => {
  let values = [];
  let { email, password } = body;

  try {
    values.push(email);
    values.push(password);
    const sqlQuery = "SELECT * from person WHERE email = ? AND password = ?";

    const login = await promiseQuery.promiseQueryFunc(sqlQuery, values);
    console.log(login);
    return {
      message: "Successfully logged in!",
      user: login,
    };
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

const createPersonDb = async (body) => {
  let values = [];
  let { name, phone, email, password } = body;
  try {
    values.push(name);
    values.push(phone);
    values.push(email);
    values.push(password);

    const sqlQuery = `INSERT INTO person (name, phone, email, password, createdAt, updatedAt) VALUES (?,?,?,?, now(), now())`;
    const createPerson = await promiseQuery.promiseQueryFunc(sqlQuery, values);

    return {
      message: "Successfully saved!",
      id: createPerson.insertId,
      affectedRows: createPerson.affectedRows,
    };
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

module.exports = {
  createPersonDb,
  getPersonDb,
};
