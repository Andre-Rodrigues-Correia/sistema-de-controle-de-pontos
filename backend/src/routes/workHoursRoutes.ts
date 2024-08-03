import { Router } from 'express';
import { WorkedHoursService } from '../services/WorkedHoursService';
import { WorkedHoursController } from '../controllers/workHoursController';

const router = Router();

const workedHoursService = new WorkedHoursService();

const workedHoursController = new WorkedHoursController(workedHoursService);

router.post('/worked-hours/:collaboratorId', workedHoursController.createWorkHours);
router.put('/worked-hours/:collaboratorId', workedHoursController.updateInOrOut);
router.get('/worked-hours/:collaboratorId', workedHoursController.getWorkHoursByEmployee);

export default router;
