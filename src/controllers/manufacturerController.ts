import { NextFunction, Request, Response } from 'express';
import db from './../utils/db';
import 'express-async-errors';
import { v4 as uuid } from 'uuid';
import AppError from '../utils/appError';

export const getManufacturers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let manufacturers;
  try {
    manufacturers = await db.query('SELECT * FROM manufacturer');
  } catch (error) {
    throw new AppError('DBError', 400);
  }
  res.status(200).json({
    status: 'success',
    data: {
      manufacturers,
    },
  });
};

export const createManufacturer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const id = uuid();
  let manufacturer;
  try {
    manufacturer = await db.query(
      `INSERT INTO manufacturer VALUES ('${id}', '${name.trim()}') RETURNING *;`
    );
  } catch (error) {
    throw new AppError('DBError', 400);
  }

  res.status(201).json({
    status: 'success',
    data: {
      manufacturer,
    },
  });
};

export const getManufacturer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let manufacturer = await db.query(
    `SELECT * FROM manufacturer WHERE id = '${req.params.id}'`
  );
  let manufacturers;
  try {
    manufacturer = await db.query(
      `SELECT * FROM manufacturer WHERE id = '${req.params.id}'`
    );
  } catch (error) {
    throw new AppError('DBError', 400);
  }
  res.status(200).json({
    status: 'success',
    data: {
      manufacturer,
    },
  });
};

export const updateManufacturer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;

  let manufacturer;
  try {
    manufacturer = await db.query(
      `UPDATE manufacturer SET name = '${name.trim()}' WHERE id = '${
        req.params.id
      }' RETURNING *;`
    );
  } catch (error) {
    throw new AppError('DBError', 400);
  }

  res.status(200).json({
    status: 'success',
    data: {
      manufacturer,
    },
  });
};

export const deleteManufacturer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await db.query(`DELETE from manufacturer WHERE id = '${req.params.id}'`);
  } catch (error) {
    throw new AppError('DBError', 400);
  }

  res.status(204).json({
    status: 'success',
  });
};

export const getEquipments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let equipments;
  try {
    equipments = await db.query(
      `SELECT * FROM equipment WHERE manufacturer_id = '${req.params.id}'`
    );
  } catch (error) {
    throw new AppError('DBError', 400);
  }

  res.status(200).json({
    status: 'success',
    data: {
      equipments,
    },
  });
};
