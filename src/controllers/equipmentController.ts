import { NextFunction, Request, Response } from 'express';
import db from './../utils/db';
import 'express-async-errors';
import { v4 as uuid } from 'uuid';

export const getEquipments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let data = await db.query('SELECT * FROM equipment');
  let equipments = data.rows;

  res.status(200).json({
    status: 'success',
    data: {
      equipments,
    },
  });
};

export const createEquipment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { manufacturer_id, model, serialNumber } = req.body;

  const id = uuid();

  let data = await db.query(
    `INSERT INTO equipment VALUES ('${id}', '${manufacturer_id.trim()}', '${model.trim()}', '${serialNumber.trim()}') RETURNING *;`
  );
  let equipment = data.rows;
  res.status(201).json({
    status: 'success',
    data: {
      equipment,
    },
  });
};

export const getEquipment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let data = await db.query(
    `SELECT * FROM equipment WHERE id = '${req.params.id}'`
  );
  let equipment = data.rows;

  res.status(200).json({
    status: 'success',
    data: {
      equipment,
    },
  });
};

export const updateEquipment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { model, serialNumber } = req.body;

  console.log(
    `UPDATE equipment SET model = '${model.trim()}' serialNumber = '${serialNumber.trim()}' WHERE id = '${
      req.params.id
    }'`
  );

  let data = await db.query(
    `UPDATE equipment SET model = '${model.trim()}', serialNumber = '${serialNumber.trim()}' WHERE id = '${
      req.params.id
    }' RETURNING *;`
  );

  let equipment = data.rows;

  res.status(200).json({
    status: 'success',
    data: {
      equipment,
    },
  });
};

export const deleteEquipment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await db.query(`DELETE from equipment WHERE id = '${req.params.id}'`);

  res.status(204).json({
    status: 'success',
  });
};

export const getManufacturers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let data = await db.query(
    `SELECT manufacturer.id,
    manufacturer.name
    FROM manufacturer
    LEFT JOIN equipment
    ON manufacturer.id = equipment.manufacturer_id AND
    equipment.id='${req.params.id}';`
  );
  let manufacturers = data.rows;

  res.status(200).json({
    status: 'success',
    data: {
      manufacturers,
    },
  });
};
