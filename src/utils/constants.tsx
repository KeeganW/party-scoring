import { Descriptions, PlayerType } from 'src/utils/types';

export const players: PlayerType[] = [
  { name: 'Jedd', id: 310, color: 'cyan' },
  { name: 'Keegan', id: 1, color: 'orange' },
  { name: 'Ken', id: 312, color: 'purple' },
  { name: 'Matt', id: 190, color: 'green' },
  { name: 'Max', id: 313, color: 'yellow' },
  { name: 'Mike', id: 314, color: 'indigo' },
  { name: 'Nick', id: 311, color: 'red' },
];

export const getPlayerById = (id: number): PlayerType => {
  return players.find(player => player.id === id) ?? { name: 'Unknown', id: -1, color: 'black' };
};

export const DESCRIPTIONS: Descriptions = {
  // Beer Die
  'pointsDie': { title: 'Points', text: 'The thrower earns a point for each die dropped by their opponents. Should have had better hands...' },
  'missDie': { title: 'Miss Table', text: 'Missed the table? Take this point. Shame...' },
  'missCatchDie': { title: 'Miss Catch', text: 'Missed an obviously catchable die which was purely your fault. Butterfingers!' },
  'sinksDie': { title: 'Sinks', text: 'The thrower earns a point for each die sunk against their opponents. Splash hit!' },
  'sunkDie': { title: 'Sunk', text: 'The person sunk earns this point. Better not roll a 5...' },

  // Cheers Governor
  'forgot': { title: 'Forgot', text: 'Forgot a rule in Cheers Governor? You get this point. Don\'t forget next time!' },
  'addedNumber': { title: 'Added Number', text: 'The person who made a new rule (said 21) gets this point.' },

  // Camel Up
  'firstPlace': { title: 'First Place', text: 'You bet on a camel in first place. Nice work!' },
  'lastPlace': { title: 'Last Place', text: 'You bet on a camel in last place. Better luck next time!' },

  // Hockey
  'goal': { title: 'Hit a Can', text: 'You hit someone else\'s can, making them drink. Sniped it!' },
  'scoredOn': { title: 'Scored On', text: 'The person whose can got hit earns this point. Play better defense!' },
  'finishedDrink': { title: 'Finished Drink', text: 'Get a point for finishing your drink. You\'re being targeted!' },
  'stoppedQuarter': { title: 'Stopped Quarter', text: 'The person who stops a quarter without it falling on its side in Hockey gets a point. Diamond hands!' },
  'failStoppedQuarter': { title: 'Failed Stopped Quarter', text: 'The person who fails to stop a quarter in Hockey, because it fell over, gets this point. Close!' },

  // Kings Cup
  'poppedCan': { title: 'Popped Can', text: 'If the can tab pops when placing your card under it, you get this point. You broke the seal!' },
  'messedUp': { title: 'Messed Up', text: 'When you mess up a table wide game like categories, you earn this point.' },
  'kingRule': { title: 'King Rule', text: 'Drew a king? Make a new rule, and get this point. Monarch of mayhem!' },

  // Magical Mixers
  'targeted': { title: 'Targeted', text: 'Someone targeted you with a spell, so you get this consolation point. Only valid when playing wizard party rules. You’ve been hexed!' },
  'spellcaster': { title: 'Spellcaster', text: 'Cast a spell on someone. Magical mischief earns you this point.' },
  'drinkWater': { title: 'Drink Water', text: 'Forced to drink water, guess you need to get good. You get this point. Only valid when playing wizard party rules.' },

  // Pass the Pigs
  'above': { title: 'Above 40', text: 'Scored above 40 in one turn, wow! You went hog wild!' },
  'piggedOut': { title: 'Pigged Out', text: 'Pigged out? Gross. Get this point.' },

  // Ride the Bus
  'busRider': { title: 'Bus Rider', text: 'You have the most remaining points in your hand, so you ride the bus. Buckle up! It’s going to be a bumpy ride.' },
  'emptyHand': { title: 'Empty Hand', text: 'You emptied your hand! Nice work.' },

  // Snappa
  'points': { title: 'Points', text: 'The thrower earns a point for each die dropped by their opponents. Should have had better hands...' },
  'miss': { title: 'Miss', text: 'Missed the table? Take this point. Shame...' },
  'missCatch': { title: 'Miss Catch', text: 'Missed an obviously catchable die which was purely your fault. Butterfingers!' },
  'sinks': { title: 'Sinks', text: 'The thrower earns a point for each die sunk against their opponents. Splash hit!' },
  'sunk': { title: 'Sunk', text: 'The person sunk earns this point. Better not roll a 5...' },

  // Wavelength
  'primaryGuessTarget': { title: 'Hit Target', text: 'The guesser hit the target. You must be on the same wavelength as the hinter!' },
  'secondaryGuessCorrect': { title: 'Correct Side', text: 'If you guessed the side the target was on from the guesser\'s dial location, you get this point. You must be pretty dialed in.' },
  'secondaryGuessWrong': { title: 'Wrong Side', text: 'You guessed the wrong side of the dial. Maybe rethink how well you know the hinter...' },
}

export const POSITIVE_ACTIONS = [
  // Beer Die
  'pointsDie',
  'sinksDie',
  // Cheers Governor
  'addedNumber',
  // Camel Up
  'firstPlace',
  // Hockey
  'goal',
  'stoppedQuarter',
  // Magical Mixers
  'spellcaster',
  // Kings Cup
  'kingRule',
  // Pass the Pigs
  'above',
  // Ride the Bus
  'emptyHand',
  // Snappa
  'points',
  'sinks',
  // Wavelength
  'primaryGuessTarget',
  'secondaryGuessCorrect',
];

export const NEUTRAL_ACTIONS = [
  // Beer Die
  'targeted',
  'sunkDie',
  // Hockey
  'finishedDrink',
  // Magical Mixers
  'drinkWater',
  // Pass the Pigs
  'piggedOut', // Happens too much
  // Snappa
  'sunk',
];

export const NEGATIVE_ACTIONS = [
  // Beer Die
  'missDie',
  'missCatchDie',
  // Cheers Governor
  'forgot',
  // Camel Up
  'lastPlace',
  // Hockey
  'scoredOn',
  'failStoppedQuarter',
  // Kings Cup
  'poppedCan',
  'messedUp',
  // Pass the Pigs
  // 'piggedOut', // Happens too much
  // Ride the Bus
  'busRider',
  // Snappa
  'miss',
  'missCatch',
  // Wavelength
  'secondaryGuessWrong',
];
