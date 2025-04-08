import { ActionIcon, Button, Card, Center, Container, Group, Stack, Title } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { Descriptions, PlayerType } from 'src/utils/types';
import styles from 'src/components/Page.module.css';

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
}

export const Page = ({ descriptions, title, players, actions, undoAction, undoDisabled }: PageProps) => {
  const navigate = useNavigate();
  return (
    <Center>
      <Container>
        <Center>
          <div style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: 'white', zIndex: 1000, padding: '10px 0' }}>
            <Center>
              <Group gap="lg">
                <ActionIcon onClick={() => {
                  navigate('/games')
                }}>
                  <IconArrowLeft />
                </ActionIcon>
                <Title order={2}>{title}</Title>
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
              <Card shadow="sm" key={playerIndex} className={styles.cardContainer} style={{ minWidth: '160px' }}>
                <Card.Section>
                  <Center>
                    <Title order={5}>{player.name}</Title>
                  </Center>
                </Card.Section>
                <Stack>
                  {actions({ player })}
                </Stack>
              </Card>
            ))}
          </Group>
        </Stack>
      </Container>
    </Center>
  );
};
