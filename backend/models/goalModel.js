import userController from '../controllers/userController.js';
import db from '../db.js';

// get all goals from the user
const getAllGoals = async () => {
  const [rows] = await db.query('SELECT * FROM goals where user_id = ?', [userController.id]);
  return rows;
};

// get specific goal from userController
const getGoalById = async (id) => {
  const [rows] = await db.query('SELECT * FROM goals WHERE id = ?', [id]);
  return rows[0];
};

// add a new goal to the user
const addGoal = async (user_id ,goal) => {
  const {goal: goalName, category, progress, start, goalFinish, notes } = goal;
  const [result] = await db.query(
    'INSERT INTO GOALS (user_id, goal, category, progress, start, goalFinish, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [user_id, goalName, category, progress, start, goalFinish, notes]
  );
  return result;
};

export default { getAllGoals, getGoalById, addGoal };