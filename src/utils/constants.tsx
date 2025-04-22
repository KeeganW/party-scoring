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
  'pointsDie': { game: 'Beer Die', title: 'Points', text: 'The thrower earns a point for each die dropped by their opponents. Should have had better hands...' },
  'missDie': { game: 'Beer Die', title: 'Miss Table', text: 'The thrower missed the table? Take this point. Shame...' },
  'missCatchDie': { game: 'Beer Die', title: 'Miss Catch', text: 'If someone missed an obviously catchable die which was purely their fault, then they get this point. Butterfingers!' },
  'sinksDie': { game: 'Beer Die', title: 'Sinks', text: 'The thrower earns a point for each die sunk against their opponents. Splash hit!' },
  'sunkDie': { game: 'Beer Die', title: 'Sunk', text: 'The person sunk earns this point. Better not roll a 5...' },

  // Cheers Governor
  'forgot': { game: 'Cheers Governor', title: 'Forgot', text: 'Forgot a rule in Cheers Governor? The person who forgot gets this point. Don\'t forget next time!' },
  'addedNumber': { game: 'Cheers Governor', title: 'Added Number', text: 'The person who made a new rule (said 21) gets this point.' },

  // Camel Up
  'firstPlace': { game: 'Camel Up', title: 'First Place', text: 'Anyone with a betting sheet from the camel that finished the round in first place gets this point. Nice work!' },
  'lastPlace': { game: 'Camel Up', title: 'Last Place', text: 'Anyone with a betting sheet from the camel in last place earns this point. Better luck next time!' },

  // Hockey
  'goal': { game: 'Hockey', title: 'Hit a Can', text: 'The person who hit someone else\'s can, making them drink, earns this point. Sniped it!' },
  'scoredOn': { game: 'Hockey', title: 'Scored On', text: 'The person whose can got hit earns this point. Play better defense!' },
  'finishedDrink': { game: 'Hockey', title: 'Finished Drink', text: 'If someone finishes their drink, they get a point. They\'re being targeted!' },
  'stoppedQuarter': { game: 'Hockey', title: 'Stopped Quarter', text: 'The person who stops a quarter without it falling on its side in Hockey gets a point. Diamond hands!' },
  'failStoppedQuarter': { game: 'Hockey', title: 'Failed Stopped Quarter', text: 'The person who fails to stop a quarter in Hockey, because it fell over, gets this point. Close!' },

  // Hues and Cues
  'inside': { game: 'Hues and Cues', title: 'Inside the Square', text: 'For every cone inside the point square, this person earns a point. Can they taste the rainbow?' },
  'outsideFive': { game: 'Hues and Cues', title: 'More Than 5 From Square', text: 'If a person is more than 5 spaces away from the inside of the square, they get this point. Are they colorblind?' },

  // Kings Cup
  'poppedCan': { game: 'Kings Cup', title: 'Popped Can', text: 'If the can tab pops when placing a card under it, the person responsible gets this point. They broke the seal!' },
  'messedUp': { game: 'Kings Cup', title: 'Messed Up', text: 'When a person messes up a table wide game like categories, they earn this point.' },
  'kingRule': { game: 'Kings Cup', title: 'King Rule', text: 'Someone drew a king? They get this point. The Monarch governs as he wishes!' },

  // Magical Mixers
  'targeted': { game: 'Magical Mixers', title: 'Targeted', text: 'Whoever was targeted with a spell, gets this consolation point. Only valid when playing wizard party rules. You’ve been hexed!' },
  'spellcaster': { game: 'Magical Mixers', title: 'Spellcaster', text: 'If a person casts a spell on someone, they get this point. Expelliarmus!' },
  'drinkWater': { game: 'Magical Mixers', title: 'Drink Water', text: 'Forced to drink water, guess this person needs to get good, but in the meantime they get this point. Only valid when playing wizard party rules.' },

  // Pass the Pigs
  'above': { game: 'Pass the Pigs', title: 'Above 40', text: 'Scored above 40 in one turn, wow! Earn this point. They went hog wild!' },
  'piggedOut': { game: 'Pass the Pigs', title: 'Pigged Out', text: 'Pigged out? Gross. They get this point.' },

  // Ride the Bus
  'busRider': { game: 'Ride the Bus', title: 'Bus Rider', text: 'This person has the most remaining points in your hand, so they ride the bus with this point. Buckle up! It’s going to be a bumpy ride.' },
  'emptyHand': { game: 'Ride the Bus', title: 'Empty Hand', text: 'When someone empties their hand, they earn this point. Nice work.' },

  // Snappa
  'points': { game: 'Snappa', title: 'Points', text: 'The thrower earns a point for each die dropped by their opponents. Should have had better hands...' },
  'miss': { game: 'Snappa', title: 'Miss', text: 'The thrower missed the table? Take this point. Shame...' },
  'missCatch': { game: 'Snappa', title: 'Miss Catch', text: 'If someone missed an obviously catchable die which was purely their fault, then they get this point. Butterfingers!' },
  'sinks': { game: 'Snappa', title: 'Sinks', text: 'The thrower earns a point for each die sunk against their opponents. Splash hit!' },
  'sunk': { game: 'Snappa', title: 'Sunk', text: 'The person sunk earns this point. Better not roll a 5...' },

  // Wavelength
  'primaryGuessTarget': { game: 'Wavelength', title: 'Hit Target', text: 'The guesser hit the target. They must be on the same wavelength as the hinter!' },
  'secondaryGuessCorrect': { game: 'Wavelength', title: 'Correct Side', text: 'If this peanut gallery member guessed the side the target was on from the guesser\'s dial location, they get this point. You must be pretty dialed in.' },
  'secondaryGuessWrong': { game: 'Wavelength', title: 'Wrong Side', text: 'The peanut gallery member guessed the wrong side of the dial. Maybe rethink how well you know the hinter...' },
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
  // Hues and Cues
  'inside',
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
  // Hues and Cues
  'outsideFive',
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
