import goalModel from "../models/goalModel.js";

//   function to list all of the goals
const listGoals = async (req, res) => {
  try {
    const user_id = 1;
    const listOfG = await goalModel.getAllGoals(user_id);
    res.json(listOfG);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};

// function to get the goal by id
const getGoal = async (req, res) => {
  try {
    console.log("GET GOAL ROUTE HIT! ID:", req.params.id);
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

const updateGoal = async (req, res) => {
  // when a user clicks save on the editable goals all of the goals should be resaved/updated
try {
  console.log("UPDATE GOAL ROUTE HIT!");
  const user_id = 1;
  const { id, goal, category, progress, start, goalFinish, notes } = req.body;
  
  console.log("Received update request:", { id, goal, category, progress, start, goalFinish, notes });

  const result = await goalModel.updateGoal(id, { goal, category, progress, start, goalFinish, notes });
  console.log("Update result:", result);
  
  res.status(200).json({ message: 'Goal updated successfully', goalId: id });
} catch (err) {
  console.error("I failed at the update here", err);
  res.status(500).json({ error: 'Failed to update goal' });
}
}

export default { listGoals, getGoal, addGoal, updateGoal };