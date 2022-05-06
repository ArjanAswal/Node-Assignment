import { NextFunction, Request, Response } from 'express';
import db from './../utils/db';
import 'express-async-errors';
import { v4 as uuid } from 'uuid';

export const getManufacturers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let data = await db.query('SELECT * FROM manufacturer');
  let manufacturers = data.rows;
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

  let data = await db.query(
    `INSERT INTO manufacturer VALUES ('${id}', '${name.trim()}') RETURNING *;`
  );
  let manufacturer = data.rows;

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
  let data = await db.query(
    `SELECT * FROM manufacturer WHERE id = '${req.params.id}'`
  );
  let manufacturer = data.rows;
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

  let data = await db.query(
    `UPDATE manufacturer SET name = '${name.trim()}' WHERE id = '${
      req.params.id
    }' RETURNING *;`
  );
  let manufacturer = data.rows;

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
  await db.query(`DELETE from manufacturer WHERE id = '${req.params.id}'`);

  res.status(204).json({
    status: 'success',
  });
};

export const getEquipments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let data = await db.query(
    `SELECT * FROM equipment WHERE manufacturer_id = '${req.params.id}'`
  );
  let equipments = data.rows;

  res.status(200).json({
    status: 'success',
    data: {
      equipments,
    },
  });
};
