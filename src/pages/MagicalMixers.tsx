import { useEffect } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import {HistoryItem, PlayerType} from 'src/utils/Types';
import {fetchGenericScore, players, type MagicalMixersScore} from 'src/utils/Connect';
import {handleUndo} from 'src/utils/commonFunctions';
import {GenericScoreCardItem} from 'src/components/GenericScoreCardItem';

export const MagicalMixers = () => {
  const [scores, setScores] = useImmer<Map<number, MagicalMixersScore>>(new Map());
  const [history, setHistory] = useImmer<HistoryItem[]>([]);

  useEffect(() => {
    fetchGenericScore<keyof MagicalMixersScore>(setScores);
  }, [setScores]);

  const title = 'Magical Mixers';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem player={player} action={'targetted'} title={'Targetted'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const undoDisabled = history.length === 0;

  return (
    <Page title={title} players={players} actions={actions} undoAction={() => { handleUndo(setHistory, setScores); }} undoDisabled={undoDisabled} />
  );
};
