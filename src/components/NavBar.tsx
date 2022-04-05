import { Box, Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { FC, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { StoreModel } from '../model';

interface Props {
  tittle: string;
}

const NavBar: FC<Props> = (props) => {
  const { tittle } = props;
  const history = useHistory();
  const logOut = useStoreActions((actions: Actions<StoreModel>) => actions.user.logOut);
  const auth = useStoreState((state: StoreModel) => state.user.auth);
  const clearSearchStr = useStoreState((state: Actions<StoreModel>) => state.books.clearSearchStr);
  const logOutHandler = useCallback(() => {
    if (!auth) {
      history.push('./login');
    }
    logOut();
  }, [auth]);
  return (
    <Flex>
      <Box>
        <Heading size="md">{tittle}</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button colorScheme="teal" onClick={logOutHandler}>
          Log out
        </Button>
      </Box>
    </Flex>
  );
};

export default NavBar;
