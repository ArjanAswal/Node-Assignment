import * as equipmentController from './../controllers/equipmentController';
import express from 'express';

const router = express.Router();

router
  .route('/')
  .get(equipmentController.getEquipments)
  .post(equipmentController.createEquipment);

router.route('/:id/manufacturer').get(equipmentController.getManufacturers);

router
  .route('/:id')
  .get(equipmentController.getEquipment)
  .patch(equipmentController.updateEquipment)
  .delete(equipmentController.deleteEquipment);

export default router;
