import express from 'express';
import cors from 'cors';
import { PlayerController } from './controllers/playerController';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const playerController = new PlayerController();

app.get('/players', (req, res) => playerController.getAllPlayers(req, res));
app.get('/players/:id', (req, res) => playerController.getPlayerById(req, res));

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 