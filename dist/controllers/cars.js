"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.updateCarInfo = exports.detailCarInfo = exports.addNewCar = exports.listCars = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const listCars = async (_, res) => {
    try {
        const carList = await (0, connection_1.default)('cars');
        return res.json(carList);
    }
    catch (_a) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.listCars = listCars;
const addNewCar = async (req, res) => {
    const { brand, model, year, color, price } = req.body;
    try {
        const newCar = await (0, connection_1.default)('cars')
            .insert({
            brand,
            model,
            year,
            color,
            price
        }).returning('*');
        return res.status(201).json(newCar[0]);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.addNewCar = addNewCar;
const detailCarInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const carDetails = await (0, connection_1.default)('cars')
            .where({ id: Number(id) }).first();
        if (!carDetails) {
            return res.status(404).json({ error: 'Car not found' });
        }
        return res.json(carDetails);
    }
    catch (_a) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.detailCarInfo = detailCarInfo;
const updateCarInfo = async (req, res) => {
    const { id } = req.params;
    const { brand, model, year, color, price } = req.body;
    try {
        const carDetails = await (0, connection_1.default)('cars')
            .where({ id: Number(id) }).first();
        if (!carDetails) {
            return res.status(404).json({ error: 'Car not found' });
        }
        await (0, connection_1.default)('cars').update({
            brand,
            model,
            year,
            color,
            price
        }).where({ id: Number(id) });
        return res.status(204).send();
    }
    catch (_a) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateCarInfo = updateCarInfo;
const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const carDetails = await (0, connection_1.default)('cars')
            .where({ id: Number(id) }).first();
        if (!carDetails) {
            return res.status(404).json({ error: 'Car not found' });
        }
        await (0, connection_1.default)('cars').delete().where({ id: Number(id) });
        return res.status(204).send();
    }
    catch (_a) {
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteCar = deleteCar;
