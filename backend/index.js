import express from 'express';
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());


// Define routes here
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});