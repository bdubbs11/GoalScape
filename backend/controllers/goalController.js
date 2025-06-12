import goalModel from "../models/goalModel.js";

//   function to list all of the goals
const listGoals = async (req, res) => {
  try {
    const listOfG = await goalModel.getAllGoals();
    res.json(listOfG);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};

// function to get the goal by id
const getGoal = async (req, res) => {
  try {
    const goal = await goalModel.getGoalById(req.params.id);
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    res.json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  };
};

const addGoal = async (req, res) => {
  try {
    // will be the current user id once user authentication is implemented
    // console.log("i madee it to the controllelr");
    const user_id = 1;
    const { goal, category, progress, start, goalFinish, notes } = req.body;
    // console.log("right before the result");

    const result = await goalModel.addGoal(user_id, { goal, category, progress, start, goalFinish, notes });
    res.status(201).json({ message: 'Goal added successfully', goalId: result.insertId });
    // console.log("i am after the result");
  } catch (err) {
    console.error("i failed here:", err);
    res.status(500).json({ error: 'Failed to add goal' });
  }
}

export default { listGoals, getGoal, addGoal };