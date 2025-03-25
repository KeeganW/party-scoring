import {Button, Card, Center, Container, Group, Stack, Title} from '@mantine/core';
import {PlayerType} from 'src/utils/Types';

export interface ActionDisplayProps {
  player: PlayerType;
  playerIndex: number;
}

export interface PageProps {
  title: string;
  players: PlayerType[];
  actions: (props: ActionDisplayProps) => React.ReactNode;
  display: (props: ActionDisplayProps) => React.ReactNode;
  undoAction: () => void;
  undoDisabled: boolean;
}

export const Page = ({title, players, actions, display, undoAction, undoDisabled}: PageProps) => {
  return (
    <Center>
      <Container>
        <Center>
          <div style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: 'white', zIndex: 1000, padding: '10px 0' }}>
            <Center>
              <Title order={1}>{title}</Title>
              <Button onClick={undoAction} disabled={undoDisabled} style={{ marginLeft: '20px' }}>Undo</Button>
            </Center>
          </div>
        </Center>
        <div style={{ marginTop: '80px' }}>
          <Stack gap="xl">
            {players.map((player, playerIndex) => (
              <Card key={playerIndex}>
                <Card.Section>
                  <Center>
                    <Title order={4}>{player.name}</Title>
                  </Center>
                </Card.Section>
                <Group>
                  {actions({player, playerIndex})}
                </Group>
                <Group grow>
                  {display({player, playerIndex})}
                </Group>
              </Card>
            ))}
          </Stack>
        </div>
      </Container>
    </Center>
  );
};
