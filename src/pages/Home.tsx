import {Container, Button, Group, Center, Stack, Title} from '@mantine/core';
import { Link } from 'react-router';

const buttons = [
  { text: 'Snappa', link: '/snappa' },
  { text: 'Hockey', link: '/hockey' },
  // { text: 'Magical Mixers', link: '/magical_mixers' },
  // { text: 'Ride the Bus', link: '/ride_the_bus' },
  // { text: 'Cheers Governor', link: '/cheers_governor' },
];

export default function Welcome() {
  return (
    <Center style={{ height: '100vh' }}>
      <Container style={{ maxWidth: 300, textAlign: 'center' }}>
        <Title order={1}>Welcome!</Title>
        <Title order={6}>Please select what game you are playing.</Title>
        <Stack>
          {buttons.map((button, index) => (
            <Group key={index} grow>
              <Button component={Link} to={button.link}>
                {button.text}
              </Button>
            </Group>
          ))}
        </Stack>
      </Container>
    </Center>
  );
}
