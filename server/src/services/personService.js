const personDb = require("../db/personDb");

const getPersonService = async (user, query) => {
  try {
    let results = await personDb.getPersonDb(user, query);
    return results;
  } catch (e) {
    const statusCode = e.statusCode || 500;
    throw new Error(statusCode);
  }
};


const loginPersonService = async (body) => {
  try {
    const { email, password } = body;
    let results = await personDb.getPersonDb(body);

    if (results.length === 0) {
      throw new Error("User not found");
    }

    const storedPassword = results.user[0].password;
    const userId = results.user[0].id;

    if (storedPassword !== password) {
      throw new Error('Invalid password');
    }
    return { loggedIn: true, results: results };
  } catch (e) {
    const statusCode = 500;
    console.log(e);
    throw new Error(statusCode);
  }
};

const createPersonService = async (body) => {
  try {
    let results = await personDb.createPersonDb(body);
    return results;
  } catch (e) {
    const statusCode = 500;
    console.log(e);
    throw new Error(statusCode);
  }
};

module.exports = {
  getPersonService,
  createPersonService,
  loginPersonService,
};
