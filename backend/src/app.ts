import express from 'express';
import bodyParser from 'body-parser';
import workHoursRoutes from "./routes/workHoursRoutes";
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(bodyParser.json());
app.use('/api', workHoursRoutes);


export default app;
