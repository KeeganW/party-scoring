import { useEffect } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import {HistoryItem, PlayerType} from 'src/utils/types';
import {fetchGenericScore, players, type HockeyScore} from 'src/utils/connect';
import {handleUndo} from 'src/utils/commonFunctions';
import {GenericScoreCardItem} from 'src/components/GenericScoreCardItem';

export const Hockey = () => {
  const [scores, setScores] = useImmer<Map<number, HockeyScore>>(new Map());
  const [history, setHistory] = useImmer<HistoryItem[]>([]);

  useEffect(() => {
    fetchGenericScore<keyof HockeyScore>(setScores);
  }, [setScores]);

  const title = 'Hockey';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem player={player} action={'scoredOn'} title={'Hit by quarter'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem player={player} action={'finishedDrink'} title={'Finished drink'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem player={player} action={'stoppedQuarter'} title={'Stopped quarter'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem player={player} action={'failStoppedQuarter'} title={'Failed to stop quarter'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const undoDisabled = history.length === 0;

  return (
    <Page title={title} players={players} actions={actions} undoAction={() => { handleUndo(setHistory, setScores); }} undoDisabled={undoDisabled} />
  );
};
