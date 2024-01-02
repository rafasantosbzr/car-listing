import { Request, Response } from 'express';
import knex from '../database/connection';

export const listCars = async (_: Request, res: Response) => {
    try {
        const carList = knex('cars');
        return res.json(carList);
    } catch {
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export const addNewCar = async (req: Request, res: Response) => {
    
}

export const detailCarInfo = async (req: Request, res: Response) => {
    
}

export const updateCarInfo = async (req: Request, res: Response) => {
    
}

export const deleteCar = async (req: Request, res: Response) => {
    
}