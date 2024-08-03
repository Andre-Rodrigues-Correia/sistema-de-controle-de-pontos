import { Router } from 'express';
import {getWorkHoursByEmployee, upsertWorkHours} from '../controllers/workHoursController';

const router = Router();

router.post('/worked-hours/:collaboratorId', upsertWorkHours);
router.get('/worked-hours/:collaboratorId', getWorkHoursByEmployee);

export default router;
