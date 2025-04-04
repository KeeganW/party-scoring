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
  'pointsDie': { title: 'Points', text: 'The thrower earns a point for each die dropped by their opponents. Should have had better hands...' },
  'sinksDie': { title: 'Sinks', text: 'The thrower earns a point for each die sunk against their opponents. Splash hit!' },
  'sunkDie': { title: 'Sunk', text: 'The person sunk earns this point. Better not roll a 5...' },
  'forgot': { title: 'Forgot', text: 'Forgot a rule in Cheers Governor? You get this point. Don\'t forget next time!' },
  'addedNumber': { title: 'Added Number', text: 'The person who made a new rule (said 21) in Cheers Governor gets this point.' },
  'scoredOn': { title: 'Scored On', text: 'The person who\'s can got hit earns this point. Play better defense!' },
  'finishedDrink': { title: 'Finished Drink', text: 'Get a point for finishing your drink. You\'re being targetted!' },
  'stoppedQuarter': { title: 'Stopped Quarter', text: 'The person who stops a quarter without it falling on its side in Hockey gets a point. If the table is too easy to do so, no points.' },
  'failStoppedQuarter': { title: 'Failed Stopped Quarter', text: 'The person who fails to stop a quarter in Hockey, because it fell over, gets this point.' },
  'poppedCan': { title: 'Popped Can', text: 'When placing cards under the can tab, if it pops, you get this point.' },
  'kingRule': { title: 'King Rule', text: 'Drew a king? Make a new rule, and get this point.' },
  'targetted': { title: 'Targetted', text: 'Someone targetted you with a spell, you get this consolation point. Only valid when playing wizard party rules.' },
  'drinkWater': { title: 'Drink Water', text: 'Forced to drink water, guess you need to get good. You get this point. Only valid when playing wizard party rules.' },
  'above40': { title: 'Above 40', text: 'Scored above 40 in one turn, wow!' },
  'piggedOut': { title: 'Pigged Out', text: 'Pigged out? Gross. Get this point.' },
  'busRider': { title: 'Bus Rider', text: 'Rode the bus by having the most remaining points in your hand. Buckle up!' },
  'emptyHand': { title: 'Empty Hand', text: 'You emptied your hand! Nice work.' },
  'points': { title: 'Points', text: 'The thrower earns a point for each die dropped by their opponents. Should have had better hands...' },
  'sinks': { title: 'Sinks', text: 'The thrower earns a point for each die sunk against their opponents. Splash hit!' },
  'sunk': { title: 'Sunk', text: 'The person sunk earns this point. Better not roll a 5...' },
}

export const POSITIVE_ACTIONS = [
  'pointsDie',
  'sinksDie',
  'addedNumber',
  'finishedDrink',
  'stoppedQuarter',
  'kingRule',
  'above40',
  'emptyHand',
  'points',
  'sinks',
];

export const NEGATIVE_ACTIONS = [
  'sunkDie',
  'forgot',
  'scoredOn',
  'failStoppedQuarter',
  'poppedCan',
  'targetted',
  'drinkWater',
  'piggedOut',
  'busRider',
  'sunk'
];
