import db from '../db.js';

const addGoalFinishedColumn = async () => {
  try {
    await db.query(`
      ALTER TABLE goals
      ADD COLUMN goal_finish DATE NULL AFTER finished;
    `); 
    console.log(' goal_finish column added to goals table.');
  } catch (err) {
    if (err.code === 'ER_DUP_FIELDNAME') {
      console.log(' Goal Finished column already exists.');
    } else {
      console.error(' Error adding goal finished to column:', err);
    }
  } finally {
    await db.end();
  }
};

addGoalFinishedColumn();