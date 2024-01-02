import { Router } from "express";
import { addNewCar, deleteCar, detailCarInfo, listCars, updateCarInfo } from "./controllers/cars";

const routes = Router();

routes.get('/cars', listCars);
routes.post('/cars', addNewCar);
routes.get('/cars/:id', detailCarInfo);
routes.put('/cars/:id', updateCarInfo);
routes.delete('/cars/:id', deleteCar);

export default routes;