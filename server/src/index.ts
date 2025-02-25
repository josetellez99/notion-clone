import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import AuthRouter from "@/routes/auth.routes";
import pagesRouter from '@/routes/pages.routes';
import { pool } from "@/db/pool"
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT

// Middleware
app.use(cors());
app.use(express.json());
app.use("/auth", AuthRouter);
app.use("/pages", pagesRouter)

// Test database connection
pool.connect()
    .then(() => console.log('Connected to PostgreSQL'))
    .catch(err => console.error('Error connecting to PostgreSQL:', err));

// Test route
app.get('/', (req, res) => {
    res.send({
        name: 'Jose'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
