import { Container, Button, Group, Center, Stack, Title } from '@mantine/core';
import { Link } from 'react-router';

const buttons = [
  { text: 'Games', link: '/games' },
  { text: 'Leaderboard', link: '/leaderboard' },
  { text: 'Splash Board', link: '/splash_board' },
];

export const Landing = () => {
  return (
    <Center style={{ height: '100dvh' }}>
      <Container style={{ maxWidth: 300, textAlign: 'center' }}>
        <Stack gap="md">
          <Group gap="lg">
            <Title order={1} style={{ color: '#007acc' }}>Welcome!</Title>
          </Group>
          <Stack>
            {buttons.map((button, index) => (
              <Group key={index} grow>
                <Button component={Link} to={button.link}>
                  {button.text}
                </Button>
              </Group>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Center>
  );
}
