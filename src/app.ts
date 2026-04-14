import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './routes/index.ts';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use(router)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running..🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️🏃‍♂️')
});

export default app;
