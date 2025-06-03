import db from './db.js';

// need to have the passwords hashed ... omfg

const createTables = async () => {
  const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL AFTER email,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;

  const createGoalsTable = `
  CREATE TABLE IF NOT EXISTS goals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    goal VARCHAR(250) NOT NULL,
    category VARCHAR(100),
    progress INT DEFAULT 0,
    started DATE,
    finished DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    
  );`;
  try {
    await db.query(createUsersTable);
    await db.query(createGoalsTable);
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Erorr creating tables:', err);
  } finally {
    await db.end();
  }

}




  createTables();