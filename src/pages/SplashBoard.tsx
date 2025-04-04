import { useEffect, useState } from 'react';
import { Card, Title, Center, Container, Stack, Text, Button, Group, ActionIcon } from '@mantine/core';
import { useImmer } from 'use-immer';
import { AllGenericScores } from 'src/utils/types';
import { fetchGenericScore } from 'src/utils/connect';
import { useNavigate } from 'react-router';
import { IconArrowLeft } from '@tabler/icons-react';

export const SplashBoard = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useImmer<Map<number, any>>(new Map());
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGenericScore<keyof AllGenericScores>(setScores).then(() => { setLoading(false); });
  }, [setScores]);

  useEffect(() => {
    if (scores.size > 0) {
      const totalScore: number = Array.from(scores.values()).reduce((acc: number, score: any): number => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return score.sinksDie + score.sinks + acc;
      }, 0);
      setTotal(totalScore);
    }
  }, [scores]);

  return (
    <Center style={{ height: '100vh', background: '#f4f4f4' }}>
      <Container style={{ maxWidth: 350, textAlign: 'center', padding: 20, borderRadius: 10, background: 'white', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
        <Stack gap="md">
          <Group gap="lg">
            <ActionIcon onClick={() => {
              navigate('/')
            }}>
              <IconArrowLeft />
            </ActionIcon>
            <Title order={2} style={{ color: '#007acc' }}>Splash Board</Title>
          </Group>
          {loading ? (
            <Text>Loading scores...</Text>
          ) : (
            <Card shadow="xl" padding="lg" radius="lg" withBorder style={{ background: '#007acc', color: 'white' }}>
              <Title order={1} style={{ fontSize: '3rem' }}>{total}</Title>
            </Card>
          )}
          <Button variant="filled" color="blue" onClick={() => { window.location.reload(); }}>Refresh</Button>
        </Stack>
      </Container>
    </Center>
  );
}

