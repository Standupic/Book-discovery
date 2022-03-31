import { FC, useEffect, useCallback } from 'react';
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import { Container, Input, Box, VStack, Grid, GridItem } from '@chakra-ui/react';
import { StoreModel } from '../model';
import { IBook } from '../types/books';
import BookItem from '../components/BookItem';
import NavBar from '../components/NavBar';
import Loader from '../components/Loader';

const Books: FC = () => {
  const history = useHistory();
  const auth = useStoreState((state: StoreModel) => state.user.auth);
  const { books, error, loading } = useStoreState((state: StoreModel) => state.books);
  const { fetchBooks, getBook, searchBooks, setError } = useStoreActions(
    (actions: Actions<StoreModel>) => actions.books,
  );
  const getBookHandler = async (key: string) => {
    const book = await getBook(key);
    if (book) {
      history.push(`/books/${book.id}`);
    }
  };

  useEffect(() => {
    if (!auth) {
      history.push('/login');
    }
  }, [auth]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const bookMap = books.map((book) => {
    return (
      <GridItem key={book.id} onClick={() => getBookHandler(book.id)}>
        <BookItem
          publisher={book.publisher}
          synopsis={book.synopsis}
          tittle={book.tittle}
          author={book.author}
          id={book.id}
          pageCount={book.pageCount}
          coverImageUrl={book.coverImageUrl}
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
              <Input
                placeholder="to search"
                onChange={(e) => {
                  searchBooks(e.target.value);
                }}
              />
            </Box>
            {loading ? (
              <Loader />
            ) : (
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                {!loading && bookMap}
              </Grid>
            )}
          </VStack>
        </Container>
      </Box>
    </>
  );
};
export default Books;
