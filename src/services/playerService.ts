import axios from 'axios';
import { Player } from '../types/player';

const API_URL = process.env.API_URL || 'https://eurosportdigital.github.io/eurosport-node-developer-recruitment/headtohead.json';

export class PlayerService {
  private static instance: PlayerService;
  private players: Player[] = [];

  private constructor() {}

  public static getInstance(): PlayerService {
    if (!PlayerService.instance) {
      PlayerService.instance = new PlayerService();
    }
    return PlayerService.instance;
  }

  public async fetchPlayers(): Promise<Player[]> {
    try {
      const response = await axios.get<{ players: Player[] }>(API_URL);
      this.players = response.data.players.sort((a, b) => a.id - b.id);
      return this.players;
    } catch (error) {
      console.error('Error fetching players:', error);
      throw new Error('Failed to fetch players data');
    }
  }

  public async getPlayerById(id: number): Promise<Player | null> {
    if (this.players.length === 0) {
      await this.fetchPlayers();
    }
    return this.players.find(player => player.id === id) || null;
  }

  public async getAllPlayers(): Promise<Player[]> {
    if (this.players.length === 0) {
      await this.fetchPlayers();
    }
    return this.players;
  }
} 