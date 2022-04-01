import { useHistory, useParams } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { Box, Container, Flex } from '@chakra-ui/react';
import { StoreModel } from '../model';
import { IBook } from '../types/books';
import BookItem from '../components/BookItem';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';

const Book: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<IBook | null>(null);
  const auth = useStoreState((state: StoreModel) => state.user.auth);
  const { loading } = useStoreState((state: StoreModel) => state.books);
  const { getBook } = useStoreActions((actions: Actions<StoreModel>) => actions.books);
  const history = useHistory();
  const setBookHandler = async () => {
    const { book } = await getBook(id);
    setBook(book);
  };
  useEffect(() => {
    if (!auth) {
      history.push('/login');
    }
  }, [auth]);
  useEffect(() => {
    setBookHandler();
  }, [history, id]);
  if (book) {
    return (
      <>
        <Box p={5}>
          <NavBar tittle="Book description" />
        </Box>
        <Flex align="center" justify="center" h="100vh">
          <Container minW="container.lg" p={0}>
            <Box bg="white" flex={2} p={6} rounded="md" maxW="1000px">
              <BookItem
                publisher={book.publisher}
                synopsis={book.synopsis}
                title={book.title}
                author={book.author}
                pageCount={book.pageCount}
                id={book.id}
                coverImageUrl={book.coverImageUrl}
              />
            </Box>
          </Container>
        </Flex>
      </>
    );
  }
  return <>{loading && <Loader />}</>;
};

export default Book;
