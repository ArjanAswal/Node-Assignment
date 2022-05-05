import * as manufacturerController from './../controllers/manufacturerController';
import express from 'express';

const router = express.Router();

router
  .route('/')
  .get(manufacturerController.getManufacturers)
  .post(manufacturerController.createManufacturer);

router
  .route('/:id')
  .get(manufacturerController.getManufacturer)
  .patch(manufacturerController.updateManufacturer)
  .delete(manufacturerController.deleteManufacturer);

router.route('/:id/equipments').get(manufacturerController.getEquipments);

export default router;
