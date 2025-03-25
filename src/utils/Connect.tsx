import axios from 'axios';
import {PlayerType} from 'src/utils/Types';

export const players: PlayerType[] = [
  { name: 'Jedd', id: 310 },
  { name: 'Nick', id: 311 },
  { name: 'Matt', id: 190 },
  { name: 'Ken', id: 312 },
  { name: 'Max', id: 313 },
  { name: 'Mike', id: 314 },
  { name: 'Keegan', id: 1 },
];

export interface HockeyScore {
  scoredOn: number;
  finishedDrink: number;
  stoppedQuarter: number;
}

export interface SnappaScore {
  points: number;
  sinks: number;
  sunk: number;
}

export type AllGenericScores = HockeyScore | SnappaScore;
export type AllGenericScoresKeys = keyof HockeyScore | keyof SnappaScore;

export interface PlayerGenericScore<K extends string> {
  player: number;
  key: K;
  value: number;
}

// TODO fix this type
export const fetchGenericScore = async <T extends AllGenericScoresKeys>(setGenericScores: (value: Map<number, any>) => void) => {
  const baseUrl = window.location.hostname.includes('github.io')
    ? 'https://api.boardgameleague.io/'
    : 'http://localhost:8000/';
  const url = `${baseUrl}generic_score/`;
  try {
    const response = await axios.get<PlayerGenericScore<T>[]>(url);

    const fetchedScores = new Map<number, AllGenericScores>();
    const defaultObject = { scoredOn: 0, finishedDrink: 0, stoppedQuarter: 0, points: 0, sinks: 0, sunk: 0 };

    response.data.forEach(({ player, key, value }) => {
      if (!fetchedScores.has(player)) {
        fetchedScores.set(player, {...defaultObject});
      }
      const playerScore = fetchedScores.get(player);
      if (playerScore) {
        // TODO fix this type
        (playerScore as any)[key] = value;
      }
    });

    players.forEach(player => {
      if (!fetchedScores.has(player.id)) {
        fetchedScores.set(player.id, {...defaultObject});
      }
    });

    setGenericScores(fetchedScores);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


export const setGenericScore = async (newScore: PlayerGenericScore<AllGenericScoresKeys>) => {
  const baseUrl = window.location.hostname.includes('github.io')
    ? 'https://api.boardgameleague.io/'
    : 'http://localhost:8000/';
  const url = `${baseUrl}generic_score/`;
  try {
    const response = await axios.post(url, newScore);

    console.log(response);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
