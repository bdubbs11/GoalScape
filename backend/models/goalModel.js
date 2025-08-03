import userController from '../controllers/userController.js';
import db from '../db.js';

// get all goals from the user
const getAllGoals = async (user_id) => {
  const [rows] = await db.query('SELECT * FROM goals WHERE user_id = ?', [user_id]);
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
 try {
    const [result] = await db.query(
      'INSERT INTO goals (user_id, goal, category, progress, started, goal_finish, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [user_id, goalName, category, progress, start, goalFinish, notes]
    );
    return result;
  } catch (error) {
    console.error('DB Insert error:', error);
    throw error;
  }
};

  // update a goal
  const updateGoal = async (id, goal) => {
    console.log("Updating goal in model:", goal);
    const { goal: goalName, category, progress, start, goalFinish, notes } = goal;
    try {
      console.log("Updating goal in DB:", { id, goalName, category, progress, start, goalFinish, notes });
      
      const [result] = await db.query(
        'UPDATE goals SET goal = ?, category = ?, progress = ?, started = ?, goal_finish = ?, notes = ? WHERE id = ?',
      [goalName, category, progress, start, goalFinish, notes, id]
    );
      
      console.log("DB update result:", result);
      return result;
  } catch (error) {
    console.error('DB Update error:', error);
    throw error;
  }
};

export default { getAllGoals, getGoalById, addGoal, updateGoal };