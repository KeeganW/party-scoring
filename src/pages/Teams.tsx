import { useEffect, useState } from 'react';
import { Page } from 'src/components/Page';
import { useImmer } from 'use-immer';
import { HistoryItem, PlayerType, TeamsScore } from 'src/utils/types';
import { fetchGenericScore } from 'src/utils/connect';
import { handleUndo } from 'src/utils/commonFunctions';
import { GenericScoreCardItem } from 'src/components/GenericScoreCardItem';
import { setScoreFromWebSocket, useWebSocket } from 'src/utils/websocket';
import { players } from 'src/utils/constants';

export const Teams = () => {
  const webSocket = useWebSocket('generic-score');
  const [scores, setScores] = useImmer<Map<number, TeamsScore>>(new Map());
  const [history, setHistory] = useState<HistoryItem>(undefined);

  useEffect(() => {
    fetchGenericScore<keyof TeamsScore>(setScores);
  }, [setScores]);

  useEffect(() => {
    setScoreFromWebSocket<keyof TeamsScore>(webSocket, setScores);
  }, [webSocket.updates]);

  const title = 'Teams';

  const actions = ({ player }: { player: PlayerType }) => {
    const teamActions = [
      'keeganAndKen', 'keeganAndJedd', 'keeganAndMax', 'keeganAndMatt', 'keeganAndMike', 'keeganAndNick',
      'kenAndKeegan', 'kenAndJedd', 'kenAndMax', 'kenAndMatt', 'kenAndMike', 'kenAndNick',
      'jeddAndKeegan', 'jeddAndKen', 'jeddAndMax', 'jeddAndMatt', 'jeddAndMike', 'jeddAndNick',
      'maxAndKeegan', 'maxAndKen', 'maxAndJedd', 'maxAndMatt', 'maxAndMike', 'maxAndNick',
      'mattAndKeegan', 'mattAndKen', 'mattAndJedd', 'mattAndMax', 'mattAndMike', 'mattAndNick',
      'mikeAndKeegan', 'mikeAndKen', 'mikeAndJedd', 'mikeAndMax', 'mikeAndMatt', 'mikeAndNick',
      'nickAndKeegan', 'nickAndKen', 'nickAndJedd', 'nickAndMax', 'nickAndMatt', 'nickAndMike',
    ];

    return teamActions.filter(action => action.split("And")[0] === player.name.toLowerCase()).map(action => (
      <GenericScoreCardItem
        key={action}
        enableMinus={true}
        webSocket={webSocket}
        player={player}
        action={(action as keyof TeamsScore)}
        scores={scores}
        setHistory={setHistory}
        setScores={setScores}
        title={`with ${action.split("And")[1]}`}
      />
    ));
  };

  const undoDisabled = !history;

  const descriptions = {  };

  return (
    <Page title={title} players={players} actions={actions} descriptions={descriptions} undoAction={() => { handleUndo(history, setHistory, setScores, webSocket); }} undoDisabled={undoDisabled} />
  );
};
