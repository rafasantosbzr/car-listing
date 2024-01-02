import { Request, Response } from 'express';
import knex from '../database/connection';
import Car from '../models';

export const listCars = async (_: Request, res: Response) => {
    try {
        const carList = await knex<Car>('cars');
        return res.json(carList);
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const addNewCar = async (req: Request, res: Response) => {
    const { brand, model, year, color, price } = req.body;
    try {
        const newCar = await knex<Omit<Car, 'id'>>('cars')
        .insert({
            brand,
            model,
            year,
            color,
            price
        }).returning('*');

        return res.status(201).json(newCar[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const detailCarInfo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const carDetails = await knex<Car>('cars')
        .where({ id: Number(id) }).first();

        if (!carDetails) {
            return res.status(404).json({ error: 'Car not found' });
        }

        return res.json(carDetails);
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateCarInfo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { brand, model, year, color, price } = req.body;
    try {
        const carDetails = await knex<Car>('cars')
        .where({ id: Number(id) }).first();

        if (!carDetails) {
            return res.status(404).json({ error: 'Car not found' });
        }

        await knex<Car>('cars').update({
            brand,
            model,
            year,
            color,
            price
        }).where({ id: Number(id) });

        return res.status(204).send();
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const deleteCar = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const carDetails = await knex<Car>('cars')
        .where({ id: Number(id) }).first();

        if (!carDetails) {
            return res.status(404).json({ error: 'Car not found' });
        }
        
        await knex<Car>('cars').delete().where({ id: Number(id) });

        return res.status(204).send();
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}