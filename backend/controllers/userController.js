
import userModel from '../models/userModel.js';

// function to list all of the users

const listUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
};

// function to get the user by id
const getUser = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  };
};

export default { listUsers, getUser };