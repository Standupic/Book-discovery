import { Box, Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import { Actions, useStoreActions } from 'easy-peasy';
import { StoreModel } from '../model';

const NavBar = () => {
  const logOut = useStoreActions((actions: Actions<StoreModel>) => actions.user.logOut);
  return (
    <Flex>
      <Box p="2">
        <Heading size="md">Book discovery App</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button
          colorScheme="teal"
          onClick={() => {
            logOut();
          }}>
          Log out
        </Button>
      </Box>
    </Flex>
  );
};

export default NavBar;
