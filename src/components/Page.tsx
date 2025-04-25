import { ActionIcon, Button, Card, Center, Container, Group, Stack, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { Descriptions, PlayerType } from 'src/utils/types';
import styles from 'src/components/Page.module.css';
import { useState } from 'react';

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
}

export const Page = ({ descriptions, title, players, actions, undoAction, undoDisabled, beerCount }: PageProps) => {
  const navigate = useNavigate();
  const [toggledPlayers, setToggledPlayers] = useState<Record<string, boolean>>(
    Object.fromEntries(players.map(player => [player.name, true]))
  );

  const handleToggle = (playerName: string) => {
    setToggledPlayers(prev => ({
      ...prev,
      [playerName]: !prev[playerName],
    }));
  };

  const filteredPlayers = players.filter(player => toggledPlayers[player.name]);

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
          <Group gap="sm" justify="center" style={{ flexWrap: 'wrap' }}>
            {players.map((player, playerIndex) => (
              <Button
                key={playerIndex}
                variant={toggledPlayers[player.name] ? 'filled' : 'outline'}
                onClick={() => handleToggle(player.name)}
              >
                {player.name}
              </Button>
            ))}
          </Group>
          <Group gap="sm" justify="center" style={{ flexWrap: 'wrap' }}>
            {filteredPlayers.map((player, playerIndex) => (
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
                {filteredPlayers.map((player) => (
                  <div>
                    {beerCount && beerCount({ player })}
                  </div>
                ))}
              </Stack>
            </Card>
          </Center>
        </Stack>
      </Container>
    </Center>
  );
};
