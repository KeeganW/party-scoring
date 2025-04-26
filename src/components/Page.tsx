import { ActionIcon, Button, Card, Center, Container, Group, Stack, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import {Descriptions, PlayerType} from 'src/utils/types';
import styles from 'src/components/Page.module.css';
import {useEffect, useState} from 'react';
import { WebSocketAction} from "src/utils/websocket";

export interface ActionDisplayProps {
  player: PlayerType;
}

export interface PageProps {
  descriptions?: Descriptions
  title: string;
  players: PlayerType[];
  actions: (props: ActionDisplayProps) => React.ReactNode;
  undoAction: () => void;
  undoDisabled: boolean;
  beerCount?: (props: ActionDisplayProps) => React.ReactNode;
  teamGame?: boolean
  webSocket?: WebSocketAction,
}

export const Page = ({ descriptions, title, players, actions, undoAction, undoDisabled, beerCount, teamGame, webSocket }: PageProps) => {
  const navigate = useNavigate();
  const [teamOnePlayers, setTeamOnePlayers] = useState<Record<string, boolean>>({});
  const [teamTwoPlayers, setTeamTwoPlayers] = useState<Record<string, boolean>>({});
  const [teamOneScore, setTeamOneScore] = useState<number>(0);
  const [teamTwoScore, setTeamTwoScore] = useState<number>(0);

  useEffect(() => {
    if (webSocket && webSocket.updates && teamGame) {
      const latestUpdate: any | undefined = webSocket.updates[webSocket.updates.length - 1]

      if (latestUpdate && latestUpdate?.key && latestUpdate?.key?.includes('point') !== -1) {
        const newScorePlayerId = latestUpdate.player;
        const playerName = players.find(player => player.id === newScorePlayerId)?.name;
        if (!playerName) return;

        const isTeamOnePlayer = teamOnePlayers[playerName];
        const isTeamTwoPlayer = teamTwoPlayers[playerName];

        if (isTeamOnePlayer) {
          setTeamOneScore(prev => prev + 1);
        } else if (isTeamTwoPlayer) {
          setTeamTwoScore(prev => prev + 1);
        }
      }
    }
  }, [webSocket?.updates]);

  const handleToggle = (playerName: string) => {
    if (teamGame) {
      if (teamOnePlayers[playerName]) {
        setTeamOnePlayers(prev => ({ ...prev, [playerName]: false }));
        setTeamTwoPlayers(prev => ({ ...prev, [playerName]: true }));
      } else if (teamTwoPlayers[playerName]) {
        setTeamTwoPlayers(prev => ({ ...prev, [playerName]: false }));
      } else {
        setTeamOnePlayers(prev => ({ ...prev, [playerName]: true}));
      }
    }
  };

  const resetScoreboard = () => {
    setTeamOnePlayers({});
    setTeamTwoPlayers({});
    setTeamOneScore(0);
    setTeamTwoScore(0);
  }

  const filteredPlayers = players.filter(player => teamOnePlayers[player.name] || teamTwoPlayers[player.name]);
  const playersInTeamGameOrNot = teamGame ? filteredPlayers : players;

  return (
    <Center>
      <Container>
        <Center>
          <div style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: 'white', zIndex: 1000, padding: '10px 0' }}>
            <Center>
              <Group gap="lg">
                <ActionIcon onClick={() => navigate('/games')}>
                  <IconArrowLeft />
                </ActionIcon>
                <Title order={2} style={{ color: '#007acc' }}>{title}</Title>
                <Button onClick={undoAction} disabled={undoDisabled}>Undo</Button>
              </Group>
            </Center>
          </div>
        </Center>
        <Stack style={{ marginTop: '60px' }}>
          <Center>
            {descriptions && (
              <div style={{ marginBottom: '15px', fontSize: '0.9rem', color: '#555' }}>
                {Object.entries(descriptions).map(([key, description]) => (
                  <div key={key}>
                    <strong>{description.title}:</strong> {description.text}
                  </div>
                ))}
              </div>
            )}
          </Center>
          {teamGame && (
            <Group gap="sm" justify="center" style={{ flexWrap: 'wrap' }}>
              {players.map((player, playerIndex) => (
                <Button
                  key={playerIndex}
                  variant={teamOnePlayers[player.name] || teamTwoPlayers[player.name] ? 'filled' : 'outline'}
                  color={teamOnePlayers[player.name] ? 'blue' : teamTwoPlayers[player.name] ? 'red' : 'gray'}
                  onClick={() => handleToggle(player.name)}
                >
                  {player.name}
                </Button>
              ))}
            </Group>
          )}
          {teamGame && (
            <Center style={{ marginTop: '20px' }}>
              <Card shadow="sm" className={styles.cardContainer} style={{ minWidth: '200px' }}>
                <Card.Section>
                  <Center>
                    <Title order={4}>Scoreboard</Title>
                  </Center>
                </Card.Section>
                <Stack>
                  <div style={{ color: '#1486e4', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {Object.entries(teamOnePlayers)
                      .filter(([_, playing]) => playing) // Only include players set to true
                      .map(([playerName]) => playerName) // Extract player names
                      .join(', ')}: {teamOneScore}
                    <ActionIcon color="blue" onClick={() => setTeamOneScore((prev) => Math.max(prev - 1, 0))}>-</ActionIcon>
                    <ActionIcon color="blue" onClick={() => setTeamOneScore((prev) => prev + 1)}>+</ActionIcon>
                  </div>
                  <div style={{ color: 'red', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {Object.entries(teamTwoPlayers)
                      .filter(([_, playing]) => playing) // Only include players set to true
                      .map(([playerName]) => playerName) // Extract player names
                      .join(', ')}: {teamTwoScore}
                    <ActionIcon color="red" onClick={() => setTeamTwoScore((prev) => Math.max(prev - 1, 0))}>-</ActionIcon>
                    <ActionIcon color="red" onClick={() => setTeamTwoScore((prev) => prev + 1)}>+</ActionIcon>
                  </div>
                </Stack>
              </Card>
            </Center>
          )}
          <Group gap="sm" justify="center" style={{ flexWrap: 'wrap' }}>
            {playersInTeamGameOrNot.map((player, playerIndex) => (
              <Card shadow="sm" key={playerIndex} className={styles.cardContainer} style={{ minWidth: '200px' }}>
                <Card.Section>
                  <Center>
                    <Title order={4}>{player.name}</Title>
                  </Center>
                </Card.Section>
                <Stack>
                  {actions({ player })}
                </Stack>
              </Card>
            ))}
          </Group>
          <Center style={{ marginTop: '20px' }}>
            <Card shadow="sm" className={styles.cardContainer} style={{ minWidth: '200px' }}>
              <Card.Section>
                <Center>
                  <Title order={4}>Beer Tracker</Title>
                </Center>
              </Card.Section>
              <Stack>
                {playersInTeamGameOrNot.map((player) => (
                  <div>
                    {beerCount && beerCount({ player })}
                  </div>
                ))}
              </Stack>
            </Card>
          </Center>
          {teamGame && (
            <Center style={{ marginTop: '20px' }}>
              <Card shadow="sm" className={styles.cardContainer} style={{ minWidth: '200px' }}>
                <Button onClick={resetScoreboard}>Reset Scoreboard</Button>
              </Card>
            </Center>
          )}
        </Stack>
      </Container>
    </Center>
  );
};
