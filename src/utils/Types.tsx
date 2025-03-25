import type {HockeyScore} from 'src/utils/Connect';

export interface PlayerType {
  name: string;
  id: number;
}
export interface HistoryItem {
  player: number;
  key: keyof HockeyScore;
}
