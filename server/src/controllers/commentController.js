const commentService = require("../services/commentService");

const getAllCommentsByVehicleIdController = async (req, res) => {
  let id = req.params.id;

  try {
    let results = await commentService.getCommentsbyIdService(id);
    res.status(200).json(results);
  } catch (e) {
    const statusCode = e.statusCode || 500;
    res.status(statusCode).json({
      message: e.message,
    });
  }
}

const createCommentController = async (req, res) => {
    let comment  = req.body[0].comment;
    let id = req.params.id;
    console.log(req.body);
    try {
      let results = await commentService.createCommentService(id, comment);
      res.status(200).json(results);
    } catch (e) {
      const statusCode = e.statusCode || 500;
      res.status(statusCode).json({
        message: e.message,
      });
    }
  };

module.exports = {
    createCommentController,
    getAllCommentsByVehicleIdController
}