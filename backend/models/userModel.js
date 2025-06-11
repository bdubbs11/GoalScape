import db from '../db.js';

// model to get all users via sql query
const getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM users');
  return rows;
};

// model to get specific user via sql query
const getUserById = async (id) => {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0]; // return the first (and only) user
};

export default { getAllUsers, getUserById }; 
