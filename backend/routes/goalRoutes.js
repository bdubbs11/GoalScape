import express from 'express';
import goalController from '../controllers/goalController.js';

const router = express.Router();

// assume everythjing is user 1 until auth is implemented
router.get('/', goalController.listGoals);
router.get('/:goal_id', goalController.getGoal);
router.post('/add', goalController.addGoal);

// router.get('/user/:user_id', goalController.listGoals);
// router.get('/user/:user_id/goal/:goal_id', goalController.getGoal);
// router.post('/user/:user_id/addGoal', goalController.addGoal);

export default router;
