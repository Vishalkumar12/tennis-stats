import { Request, Response } from 'express';
import { PlayerService } from '../services/playerService';

export class PlayerController {
  private playerService: PlayerService;

  constructor() {
    this.playerService = PlayerService.getInstance();
  }

  public async getAllPlayers(req: Request, res: Response): Promise<void> {
    try {
      const players = await this.playerService.getAllPlayers();
      res.json(players);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch players' });
    }
  }

  public async getPlayerById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        res.status(400).json({ error: 'Invalid player ID' });
        return;
      }

      const player = await this.playerService.getPlayerById(id);
      if (!player) {
        res.status(404).json({ error: 'Player not found' });
        return;
      }

      res.json(player);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch player' });
    }
  }
} 