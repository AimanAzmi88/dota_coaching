import express from 'express';
import cors from 'cors';
const app = express();
import { databaseInit } from './database/connection.js';
import healthController from './controller/health.js';
import createUser from './controller/user/register.js';
import login from './controller/user/login.js';
import userRouter from './router/user.js'
import slotRouter from './router/router.slot.js';
const PORT = 3000

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cors({
    origin: 'https://final-project-chi-indol.vercel.app', // frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // allowed headers
  }));

// app.use(cors({ origin: 'http://localhost:5173' }));

databaseInit();
app.get('/', healthController.get);
app.post('/', healthController.post);

app.post('/register', createUser);
app.post('/login', login);

app.use('/user',userRouter)
app.use('/slot', slotRouter)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});