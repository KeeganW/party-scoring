import type {HockeyScore} from './connect';

export interface PlayerType {
  name: string;
  id: number;
  color: string;
}
export interface HistoryItem {
  player: number;
  key: keyof HockeyScore;
}
