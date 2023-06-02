const personService = require("../services/personService");

const getPersonController = async (req, res) => {
  let {body} = req;
  try {
    let results = await personService.getPersonService(body);
    res.status(200).json(results);
  } catch (e) {
    const statusCode = e.statusCode || 500;
    res.status(statusCode).json({
      message: e.message,
    });
  }
}


const loginPersonController = async (req, res) => {
  let {body} = req;

  try {
    let results = await personService.loginPersonService(body);
    res.status(200).json(results);
  } catch (e) {
    const statusCode = e.statusCode || 500;
    res.status(statusCode).json({
      message: e.message,
    });
  }
}

const createPersonController = async (req, res) => {
    let { body } = req;
    try {
      let results = await personService.createPersonService(body);
      res.status(200).json(results);
    } catch (e) {
      const statusCode = e.statusCode || 500;
      res.status(statusCode).json({
        message: e.message,
      });
    }
  };

  module.exports = {
    getPersonController,
    createPersonController,
    loginPersonController
  }