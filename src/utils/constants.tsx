import { Descriptions, PlayerType } from 'src/utils/types';

export const players: PlayerType[] = [
  { name: 'Jedd', id: 310, color: 'cyan' },
  { name: 'Keegan', id: 1, color: 'orange' },
  { name: 'Ken', id: 312, color: 'purple' },
  { name: 'Matt', id: 190, color: 'green' },
  { name: 'Max', id: 313, color: 'yellow' },
  { name: 'Mike', id: 314, color: 'gray' },
  { name: 'Nick', id: 311, color: 'red' },
];

export const getPlayerById = (id: number): PlayerType => {
  return players.find(player => player.id === id) ?? { name: 'Unknown', id: -1, color: 'black' };
};

export const DESCRIPTIONS: Descriptions = {
  // Beer Die
  'pointsDie': { title: 'Points', text: 'The thrower earns a point for each die dropped by their opponents. Should have had better hands...' },
  'missDie': { title: 'Miss Table', text: 'Missed the table? Take this point. Shame...' },
  'missCatchDie': { title: 'Miss Catch', text: 'Missed an obviously catchable die which was purely your fault.' },
  'sinksDie': { title: 'Sinks', text: 'The thrower earns a point for each die sunk against their opponents. Splash hit!' },
  'sunkDie': { title: 'Sunk', text: 'The person sunk earns this point. Better not roll a 5...' },
  // Cheers Governor
  'forgot': { title: 'Forgot', text: 'Forgot a rule in Cheers Governor? You get this point. Don\'t forget next time!' },
  'addedNumber': { title: 'Added Number', text: 'The person who made a new rule (said 21) in Cheers Governor gets this point.' },
  // Hockey
  'goal': { title: 'Hit a Can', text: 'You hit someone else\'s can, making them drink.' },
  'scoredOn': { title: 'Scored On', text: 'The person who\'s can got hit earns this point. Play better defense!' },
  'finishedDrink': { title: 'Finished Drink', text: 'Get a point for finishing your drink. You\'re being targetted!' },
  'stoppedQuarter': { title: 'Stopped Quarter', text: 'The person who stops a quarter without it falling on its side in Hockey gets a point. If the table is too easy to do so, no points.' },
  'failStoppedQuarter': { title: 'Failed Stopped Quarter', text: 'The person who fails to stop a quarter in Hockey, because it fell over, gets this point.' },
  // Kings Cup
  'poppedCan': { title: 'Popped Can', text: 'When placing cards under the can tab, if it pops, you get this point.' },
  'messedUp': { title: 'Messed Up', text: 'When you mess up a table wide game like categories, you earn this point.' },
  'kingRule': { title: 'King Rule', text: 'Drew a king? Make a new rule, and get this point.' },
  // Magical Mixers
  'targetted': { title: 'Targetted', text: 'Someone targetted you with a spell, you get this consolation point. Only valid when playing wizard party rules.' },
  'spellcaster': { title: 'Spellcaster', text: 'Cast a spell on someone. Magical mischief earns you this point.' },
  'drinkWater': { title: 'Drink Water', text: 'Forced to drink water, guess you need to get good. You get this point. Only valid when playing wizard party rules.' },
  // Pass the Pigs
  'above': { title: 'Above 40', text: 'Scored above 40 in one turn, wow!' },
  'piggedOut': { title: 'Pigged Out', text: 'Pigged out? Gross. Get this point.' },
  // Ride the Bus
  'busRider': { title: 'Bus Rider', text: 'Rode the bus by having the most remaining points in your hand. Buckle up!' },
  'emptyHand': { title: 'Empty Hand', text: 'You emptied your hand! Nice work.' },
  // Snappa
  'points': { title: 'Points', text: 'The thrower earns a point for each die dropped by their opponents. Should have had better hands...' },
  'miss': { title: 'Miss', text: 'Missed the table? Take this point. Shame...' },
  'missCatch': { title: 'Miss Catch', text: 'Missed an obviously catchable die which was purely your fault.' },
  'sinks': { title: 'Sinks', text: 'The thrower earns a point for each die sunk against their opponents. Splash hit!' },
  'sunk': { title: 'Sunk', text: 'The person sunk earns this point. Better not roll a 5...' },
}

export const POSITIVE_ACTIONS = [
  // Beer Die
  'pointsDie',
  'sinksDie',
  // Cheers Governor
  'addedNumber',
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
];

export const NEUTRAL_ACTIONS = [
  // Beer Die
  'targetted',
  'sunkDie',
  // Hockey
  'finishedDrink',
  // Magical Mixers
  'drinkWater',
  // Snappa
  'sunk',
];

export const NEGATIVE_ACTIONS = [
  // Beer Die
  'missDie',
  'missCatchDie',
  // Cheers Governor
  'forgot',
  // Hockey
  'scoredOn',
  'failStoppedQuarter',
  // Kings Cup
  'poppedCan',
  'messedUp',
  // Pass the Pigs
  'piggedOut',
  // Ride the Bus
  'busRider',
  // Snappa
  'miss',
  'missCatch',
];
