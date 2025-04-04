import axios from 'axios';
import {AllGenericScores, AllGenericScoresKeys, PlayerGenericScore} from 'src/utils/types';
import {players} from 'src/utils/constants';

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
      // Beer Die
      pointsDie: 0, sinksDie: 0, sunkDie: 0,
      // Cheers Governor
      forgot: 0, addedNumber: 0,
      // Hockey
      scoredOn: 0, finishedDrink: 0, stoppedQuarter: 0, failStoppedQuarter: 0,
      // Kings Cup
      poppedCan: 0, kingRule: 0,
      // Magical Mixers
      targetted: 0, drinkWater: 0,
      // Pass the Pigs
      above40: 0, piggedOut: 0,
      // Ride the Bus
      busRider: 0, emptyHand: 0,
      // Snappa
      points: 0, sinks: 0, sunk: 0,
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
