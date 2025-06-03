import db from '../db';

const getAllUsers = (callback) => {
  db.query('SELECT * FROM users', callback);
};

module.exports = { getAllUsers };