import { useEffect } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import {HistoryItem, PlayerType} from 'src/utils/Types';
import {fetchGenericScore, players, type RideTheBusScore} from 'src/utils/Connect';
import {handleUndo} from 'src/utils/commonFunctions';
import {GenericScoreCardItem} from 'src/components/GenericScoreCardItem';

export const RideTheBus = () => {
  const [scores, setScores] = useImmer<Map<number, RideTheBusScore>>(new Map());
  const [history, setHistory] = useImmer<HistoryItem[]>([]);

  useEffect(() => {
    fetchGenericScore<keyof RideTheBusScore>(setScores);
  }, [setScores]);

  const title = 'Ride the Bus';

  const actions = ({ player }: { player: PlayerType }) => {
    return [
      <GenericScoreCardItem player={player} action={'busRider'} title={'Bus Rider'} scores={scores} setHistory={setHistory} setScores={setScores} />,
      <GenericScoreCardItem player={player} action={'emptyHand'} title={'Empty Hand'} scores={scores} setHistory={setHistory} setScores={setScores} />,
    ];
  };

  const undoDisabled = history.length === 0;

  return (
    <Page title={title} players={players} actions={actions} undoAction={() => { handleUndo(setHistory, setScores); }} undoDisabled={undoDisabled} />
  );
};
