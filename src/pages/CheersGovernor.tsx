import { useEffect } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import {HistoryItem, PlayerType} from 'src/utils/types';
import {fetchGenericScore, players, type CheersGovernorScore} from 'src/utils/connect';
import {handleUndo} from 'src/utils/commonFunctions';
import {GenericScoreCardItem} from 'src/components/GenericScoreCardItem';

export const CheersGovernor = () => {
  const [scores, setScores] = useImmer<Map<number, CheersGovernorScore>>(new Map());
  const [history, setHistory] = useImmer<HistoryItem[]>([]);

  useEffect(() => {
    fetchGenericScore<keyof CheersGovernorScore>(setScores);
  }, [setScores]);

  const title = 'Cheers Governor';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem player={player} action={'forgot'} title={'Forgot'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem player={player} action={'addedNumber'} title={'Added Number'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const undoDisabled = history.length === 0;

  return (
    <Page title={title} players={players} actions={actions} undoAction={() => { handleUndo(setHistory, setScores); }} undoDisabled={undoDisabled} />
  );
};
