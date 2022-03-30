import * as React from 'react';
import { ChakraProvider, Box, Text, Link, VStack, Code, Grid, theme } from '@chakra-ui/react';
import { Actions, useStoreActions } from 'easy-peasy';
import { ColorModeSwitcher } from './chakra/ColorModeSwitcher';
import { Logo } from './Logo';
import { User } from './model/user';
import { StoreModel } from './model';

const App = () => {
  const authorization = useStoreActions(
    (actions: Actions<StoreModel>) => actions.user.authorization,
  );
  const reg = useStoreActions((actions: Actions<StoreModel>) => actions.user.registration);
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo h="40vmin" pointerEvents="none" />
            <Text onClick={() => reg({ username: 'Lena', password: '123' })}>
              Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer">
              Learn Chakra
            </Link>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
export default App;
