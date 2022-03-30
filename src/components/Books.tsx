import { FC, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import { Container, Flex, Box, VStack, Grid, GridItem } from '@chakra-ui/react';
import { StoreModel } from '../model';

const Books: FC = () => {
  const history = useHistory();
  const auth = useStoreState((state: StoreModel) => state.user.auth);
  useEffect(() => {
    if (!auth) {
      history.push('/login');
    }
  }, [auth]);
  return (
    <Container maxW="container.lg" p={0}>
      <VStack spacing={4} align="flex-start">
        <Box>1</Box>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <GridItem w="100%" h="10" bg="blue.500">
            ss
          </GridItem>
          <GridItem w="100%" h="10" bg="blue.500" />
          <GridItem w="100%" h="10" bg="blue.500" />
          <GridItem w="100%" h="10" bg="blue.500" />
          <GridItem w="100%" h="10" bg="blue.500" />
        </Grid>
      </VStack>
    </Container>
  );
};
export default Books;
