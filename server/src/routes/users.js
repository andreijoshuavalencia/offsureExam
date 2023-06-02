const  express = require('express');
const router = express.Router();
const {getAllCarsController,getCarByIdController, createCarController, updateCarController, deleteCarController} = require('../controllers/carController');
const {createPersonController, loginPersonController, getPersonController} = require('../controllers/personController');
const {createCommentController, getAllCommentsByVehicleIdController} = require('../controllers/commentController');

router.get('/', getAllCarsController);
router.get('/car/:id', getCarByIdController)
router.post('/create/car', createCarController);
router.post('/update/:id', updateCarController);
router.delete('/delete/:id', deleteCarController);

router.get('/person', getPersonController);
router.post('/create/person',createPersonController);
router.post('/login',loginPersonController);

router.post('/create/comment/:id', createCommentController)
router.get('/comments/:id', getAllCommentsByVehicleIdController)

module.exports = router;
