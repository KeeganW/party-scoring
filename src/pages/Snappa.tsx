import { useEffect } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import {HistoryItem, PlayerType} from 'src/utils/types';
import {fetchGenericScore, players, type SnappaScore} from 'src/utils/connect';
import {handleUndo} from 'src/utils/commonFunctions';
import {GenericScoreCardItem} from 'src/components/GenericScoreCardItem';

export const Snappa = () => {
  const [scores, setScores] = useImmer<Map<number, SnappaScore>>(new Map());
  const [history, setHistory] = useImmer<HistoryItem[]>([]);

  useEffect(() => {
    fetchGenericScore<keyof SnappaScore>(setScores);
  }, [setScores]);

  const title = 'Snappa';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem player={player} action={'points'} title={'Points'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem player={player} action={'sinks'} title={'Sinks'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem player={player} action={'sunk'} title={'Sunk'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const undoDisabled = history.length === 0;

  return (
    <Page title={title} players={players} actions={actions} undoAction={() => { handleUndo(setHistory, setScores); }} undoDisabled={undoDisabled} />
  );
};
