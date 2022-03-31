import { Box, Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import { Actions, useStoreActions } from 'easy-peasy';
import { FC } from 'react';
import { StoreModel } from '../model';

interface Props {
  tittle: string;
}

const NavBar: FC<Props> = (props) => {
  const { tittle } = props;
  const logOut = useStoreActions((actions: Actions<StoreModel>) => actions.user.logOut);
  return (
    <Flex>
      <Box>
        <Heading size="md">{tittle}</Heading>
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
