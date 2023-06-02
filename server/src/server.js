const Routes = require('./routes/index');
const express = require('express');
const server = express();
const cors = require('cors');
const port = 8081; // or any other port number you prefer
const {getAllCarsController, getCarByIdController, createCarController, updateCarController, deleteCarController} = require('./controllers/carController');
const {createPersonController, loginPersonController, getPersonController} = require('./controllers/personController');
const {createCommentController, getAllCommentsByVehicleIdController} = require('./controllers/commentController');

server.use(express.json());
server.use(cors());

server.get('/', getAllCarsController);
server.get('/car/:id', getCarByIdController);
server.post('/create/car', createCarController);
server.put('/update/:id', updateCarController);
server.delete('/delete/:id', deleteCarController);

server.get('/person', getPersonController)
server.post('/create/person', createPersonController);
server.post('/login', loginPersonController);


server.post('/create/comment/:id', createCommentController);
server.get('/comments/:id', getAllCommentsByVehicleIdController);



Routes(server);

const app = server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
