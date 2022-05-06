import * as manufacturerController from './../controllers/manufacturerController';
import express from 'express';

const router = express.Router();

router
  .route('/')
  .get(manufacturerController.getManufacturers)
  .post(manufacturerController.createManufacturer);

router.route('/:id/equipment').get(manufacturerController.getEquipments);

router
  .route('/:id')
  .get(manufacturerController.getManufacturer)
  .patch(manufacturerController.updateManufacturer)
  .delete(manufacturerController.deleteManufacturer);

export default router;
