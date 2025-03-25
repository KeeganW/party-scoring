import axios from 'axios';
import {PlayerType} from './types';

export const players: PlayerType[] = [
  { name: 'Jedd', id: 310, color: 'cyan' },
  { name: 'Nick', id: 311, color: 'red' },
  { name: 'Matt', id: 190, color: 'green' },
  { name: 'Ken', id: 312, color: 'yellow' },
  { name: 'Max', id: 313, color: 'purple' },
  { name: 'Mike', id: 314, color: 'gray' },
  { name: 'Keegan', id: 1, color: 'orange' },
];

export interface CheersGovernorScore {
  forgot: number;
  addedNumber: number;
}

export interface HockeyScore {
  scoredOn: number;
  finishedDrink: number;
  stoppedQuarter: number;
  failStoppedQuarter: number;
}

export interface MagicalMixersScore {
  targetted: number;
}

export interface RideTheBusScore {
  busRider: number;
  emptyHand: number;
}

export interface SnappaScore {
  points: number;
  sinks: number;
  sunk: number;
}

export type AllGenericScores = CheersGovernorScore | HockeyScore | MagicalMixersScore | RideTheBusScore | SnappaScore;
export type AllGenericScoresKeys = keyof CheersGovernorScore | keyof HockeyScore | keyof MagicalMixersScore | keyof RideTheBusScore | keyof SnappaScore;

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
    const defaultObject = {
      // Cheers Governor
      forgot: 0, addedNumber: 0,
      // Hockey
      scoredOn: 0, finishedDrink: 0, stoppedQuarter: 0, failStoppedQuarter: 0,
      // Magical Mixers
      targetted: 0,
      // Ride the Bus
      busRider: 0, emptyHand: 0,
      // Snappa
      points: 0, sinks: 0, sunk: 0
    };

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
