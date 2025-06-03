
import userModel from '../models/userModel';

const listUsers = (req, res) => {
  userModel.getAllUsers((err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
};

module.exports = { listUsers };