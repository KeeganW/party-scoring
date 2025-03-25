import {Button, Card, Center, Container, Group, Stack, Title} from '@mantine/core';
import {PlayerType} from 'src/utils/Types';

export interface ActionDisplayProps {
  player: PlayerType;
}

export interface PageProps {
  title: string;
  players: PlayerType[];
  actions: (props: ActionDisplayProps) => React.ReactNode;
  undoAction: () => void;
  undoDisabled: boolean;
}

export const Page = ({title, players, actions, undoAction, undoDisabled}: PageProps) => {
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
          <Group gap="lg">
            {players.map((player, playerIndex) => (
              <Card key={playerIndex}>
                <Card.Section>
                  <Center>
                    <Title order={5}>{player.name}</Title>
                  </Center>
                </Card.Section>
                <Stack>
                  {actions({player})}
                </Stack>
              </Card>
            ))}
          </Group>
        </div>
      </Container>
    </Center>
  );
};
