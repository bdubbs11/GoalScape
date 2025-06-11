import db from '../db.js';

const addPasswordColumn = async () => {
  try {
    await db.query(`
      ALTER TABLE users
      ADD COLUMN password VARCHAR(255) NOT NULL AFTER email;
    `); 
    console.log(' Password column added to users table.');
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log(' Password column already exists.');
    } else {
      console.error(' Error adding password column:', err);
    }
  } finally {
    await db.end();
  }
};

addPasswordColumn();