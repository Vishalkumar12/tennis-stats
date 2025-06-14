import axios from 'axios';
import { PlayerService } from '../playerService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PlayerService', () => {
  let playerService: PlayerService;

  beforeEach(() => {
    playerService = PlayerService.getInstance();
    jest.clearAllMocks();
  });

  const mockPlayers = [
    {
      id: 2,
      firstname: 'Jannik',
      lastname: 'Sinner',
      shortname: 'J.S.',
      sex: 'M',
      country: {
        picture: 'country1.jpg',
        code: 'ITA'
      },
      picture: 'player1.jpg', 
      data: {
        rank: 1,
        points: 1000,
        weight: 80,
        height: 198,
        age: 23,
        last: [1, 1, 1, 1, 1]
      }
    },
    {
      id: 1,
      firstname: 'Carlos',
      lastname: 'Alcaraz',
      shortname: 'C.A.',
      sex: 'M',
      country: {
        picture: 'country2.jpg',
        code: 'ESP'
      },
      picture: 'player2.jpg',
      data: {
        rank: 2,
        points: 900,
        weight: 75,
        height: 190,
        age: 21,
        last: [0, 0, 0, 0, 0]
      }
    }
  ];

  describe('fetchPlayers', () => {
    it('should fetch and sort players by ID', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { players: mockPlayers } });

      const result = await playerService.fetchPlayers();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
    });

    it('should throw error when API call fails', async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error('API Error'));

      await expect(playerService.fetchPlayers()).rejects.toThrow('Failed to fetch players data');
    });
  });

  describe('getPlayerById', () => {
    it('should return player by ID', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { players: mockPlayers } });
      const result = await playerService.getPlayerById(1);

      expect(result).toEqual(mockPlayers[0]);
    });

    it('should return null when player not found', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { players: mockPlayers } });

      const result = await playerService.getPlayerById(999);

      expect(result).toBeNull();
    });
  });

  describe('getAllPlayers', () => {
    it('should return all players sorted by ID', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { players: mockPlayers } });

      const result = await playerService.getAllPlayers();

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe(1);
      expect(result[1].id).toBe(2);
    });
  });
}); 