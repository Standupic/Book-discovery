import { FC, useEffect, useState } from 'react';
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
  const fetchBooks = useStoreActions((actions: Actions<StoreModel>) => actions.books.fetchBooks);
  const getBook = useStoreActions((actions: Actions<StoreModel>) => actions.books.getBook);
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const getBookHandler = async (key: string) => {
    try {
      setLoading(true);
      const data = await getBook(key);
      const {
        book: { id },
      } = data;
      if (id) {
        history.push(`/books/${id}`);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchBooksHandler = async () => {
    try {
      setLoading(true);
      const data = await fetchBooks();
      if (data && data.books.length) {
        setBooks(data.books);
      }
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth) {
      history.push('/login');
    }
  }, [auth]);

  useEffect(() => {
    fetchBooksHandler();
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
          coverImageUrl={book.coverImageUrl}
        />
      </GridItem>
    );
  });
  return (
    <>
      <Box p={5}>
        <NavBar />
      </Box>
      {loading && <Loader />}
      <Container maxW="container.lg" p={0}>
        <VStack spacing={4} align="flex-start">
          <Box>
            <Input placeholder="to search" />
          </Box>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            {!loading && bookMap}
          </Grid>
        </VStack>
      </Container>
    </>
  );
};
export default Books;
