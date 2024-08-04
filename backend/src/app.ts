import express from 'express';
import workHoursRoutes from "./routes/workHoursRoutes";
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors({
    origin: '*',
    allowedHeaders: '*'
}));
app.use('/api', workHoursRoutes);


export default app;
