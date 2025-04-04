
export interface PlayerGenericScore<K extends string> {
  player: number;
  key: K;
  value: number;
}

export interface BeerDieScore {
  pointsDie: number;
  sinksDie: number;
  sunkDie: number;
}

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

export interface KingsCupScore {
  poppedCan: number;
  kingRule: number;
}

export interface MagicalMixersScore {
  targetted: number;
  drinkWater: number;
}

export interface PassThePigsScore {
  above40: number;
  piggedOut: number;
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

export type AllGenericScores = BeerDieScore | CheersGovernorScore | HockeyScore | KingsCupScore | MagicalMixersScore | PassThePigsScore | RideTheBusScore | SnappaScore;
export type AllGenericScoresKeys = keyof BeerDieScore | keyof CheersGovernorScore | keyof HockeyScore | keyof KingsCupScore | keyof MagicalMixersScore | keyof PassThePigsScore | keyof RideTheBusScore | keyof SnappaScore;


export interface PlayerType {
  name: string;
  id: number;
  color: string;
}

export interface HistoryItem {
  player: number;
  key: keyof AllGenericScores;
}

export type Descriptions = Record<string, Description>

export interface Description {
  title: string;
  text: string;
}
