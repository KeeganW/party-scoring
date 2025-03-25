import type {HockeyScore} from './Connect';

export interface PlayerType {
  name: string;
  id: number;
}
export interface HistoryItem {
  player: number;
  key: keyof HockeyScore;
}
