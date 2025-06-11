import express from 'express';
import userRoutes from './routes/userRoutes.js';
import goalRoutes from './routes/goalRoutes.js';
import cors from 'cors';



const app = express();
const port = 3000;
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// app.get('/api/users/test', (req, res) => {
//   res.send('Test route is working');
// });



// Define routes here
app.get('/', (req, res) => {
  res.send('hello from the backend!');
});

app.get('/test', (req, res) => {
  res.send('test page fr');
});

app.get('/test/api', (req, res) => {
  res.send('this is a test api route');
});

// Mount your routes
app.use('/api/users', userRoutes);

app.use('/api/goals', goalRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});