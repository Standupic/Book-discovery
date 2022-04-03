import { FC, useEffect } from 'react';
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { Container, Input, Box, VStack, Grid, GridItem, Text } from '@chakra-ui/react';
import debounce from 'lodash.debounce';
import { StoreModel } from '../model';
import BookItem from '../components/BookItem';
import NavBar from '../components/NavBar';
import Loader from '../components/Loader';
import { cancelableFetch } from '../helpers';
import axios from '../api';

const Books: FC = () => {
  const { books, loading, searchStr } = useStoreState((state: StoreModel) => state.books);
  const { fetchBooks, searchBooks } = useStoreActions(
    (actions: Actions<StoreModel>) => actions.books,
  );

  const requiest = () => {
    return cancelableFetch.create(
      debounce(async (source, args: any[]) => {
        searchBooks({ args, token: source });
      }, 300),
      { shouldCancelPrevRequest: true },
    );
  };

  const { fetch } = requiest();

  useEffect(() => {
    fetchBooks();
  }, []);

  const bookMap = books.map((book) => {
    return (
      <GridItem key={book.id}>
        <BookItem
          publisher={book.publisher}
          synopsis={book.synopsis}
          title={book.title}
          author={book.author}
          id={book.id}
          pageCount={book.pageCount}
          coverImageUrl={book.coverImageUrl}
          IsVisibleButton
        />
      </GridItem>
    );
  });
  return (
    <>
      <Box p={5}>
        <NavBar tittle="Book discovery App" />
      </Box>
      <Box>
        <Container maxW="container.lg" p={0}>
          <VStack spacing={4} align="flex-start">
            <Box>
              <Input placeholder="to search" onChange={(e) => fetch(e.target.value)} />
            </Box>
            {loading ? (
              <Loader />
            ) : (
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                {!loading && !bookMap.length && (
                  <GridItem>
                    <Box>
                      <Text>The result of searching: </Text>
                    </Box>
                  </GridItem>
                )}
                {!loading && bookMap.length && bookMap}
              </Grid>
            )}
          </VStack>
        </Container>
      </Box>
    </>
  );
};
export default Books;
