
export interface PlayerGenericScore<K extends string> {
  player: number;
  key: K;
  value: number;
}

export interface BeerDieScore {
  pointsDie: number;
  missDie: number;
  missCatchDie: number;
  sinksDie: number;
  sunkDie: number;
  rolledFiveDie: number;
}

export interface CheersGovernorScore {
  forgot: number;
  addedNumber: number;
}

export interface CamelUpScore {
  firstPlace: number;
  lastPlace: number;
}

export interface HockeyScore {
  goal: number;
  scoredOn: number;
  finishedDrink: number;
  stoppedQuarter: number;
  failStoppedQuarter: number;
}

export interface HuesAndCuesScore {
  inside: number;
  outsideFive: number;
}

export interface KingsCupScore {
  poppedCan: number;
  messedUp: number;
  kingRule: number;
}

export interface MagicalMixersScore {
  targeted: number;
  spellcaster: number;
  drinkWater: number;
}

export interface PassThePigsScore {
  above: number;
  piggedOut: number;
}

export interface RideTheBusScore {
  busRider: number;
  emptyHand: number;
}

export interface SnappaScore {
  points: number;
  miss: number;
  missCatch: number;
  sinks: number;
  sunk: number;
  rolledFive: number;
}

export interface TeamsScore {
  keeganAndKen: number;
  keeganAndJedd: number;
  keeganAndMax: number;
  keeganAndMatt: number;
  keeganAndMike: number;
  keeganAndNick: number;
  kenAndKeegan: number;
  kenAndJedd: number;
  kenAndMax: number;
  kenAndMatt: number;
  kenAndMike: number;
  kenAndNick: number;
  jeddAndKeegan: number;
  jeddAndKen: number;
  jeddAndMax: number;
  jeddAndMatt: number;
  jeddAndMike: number;
  jeddAndNick: number;
  maxAndKeegan: number;
  maxAndKen: number;
  maxAndJedd: number;
  maxAndMatt: number;
  maxAndMike: number;
  maxAndNick: number;
  mattAndKeegan: number;
  mattAndKen: number;
  mattAndJedd: number;
  mattAndMax: number;
  mattAndMike: number;
  mattAndNick: number;
  mikeAndKeegan: number;
  mikeAndKen: number;
  mikeAndJedd: number;
  mikeAndMax: number;
  mikeAndMatt: number;
  mikeAndNick: number;
  nickAndKeegan: number;
  nickAndKen: number;
  nickAndJedd: number;
  nickAndMax: number;
  nickAndMatt: number;
  nickAndMike: number;
}

export interface WavelengthScore {
  primaryGuessTarget: number;
  secondaryGuessCorrect: number;
  secondaryGuessWrong: number;
}

export type AllGenericScores = BeerDieScore | CheersGovernorScore | CamelUpScore | HockeyScore | HuesAndCuesScore | KingsCupScore | MagicalMixersScore | PassThePigsScore | RideTheBusScore | SnappaScore | TeamsScore | WavelengthScore;
export type AllGenericScoresKeys = keyof BeerDieScore | keyof CheersGovernorScore | keyof CamelUpScore | keyof HockeyScore | keyof HuesAndCuesScore | keyof KingsCupScore | keyof MagicalMixersScore | keyof PassThePigsScore | keyof RideTheBusScore | keyof SnappaScore | keyof TeamsScore | keyof WavelengthScore;


export interface PlayerType {
  name: string;
  id: number;
  color: string;
}

export type HistoryItem = {
  player: number;
  key: keyof AllGenericScores;
} | undefined

export type Descriptions = Record<string, Description>

export interface Description {
  game: string;
  title: string;
  text: string;
}

export interface ScoreData {
  id: number;
  key: string;
  player: number;
  timestamp: string;
  value: number;
}
