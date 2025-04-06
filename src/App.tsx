// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { MantineProvider } from '@mantine/core';
import Routes from 'src/Routes';
import { enableMapSet } from 'immer'
import {Notifications} from "@mantine/notifications";

enableMapSet()

export default function App() {
  return (
    <MantineProvider>
      <Notifications />
      <Routes />
    </MantineProvider>
  );
}
