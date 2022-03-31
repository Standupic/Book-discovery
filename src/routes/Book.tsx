import { useHistory, useParams } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { Box, Flex, Container, VStack } from '@chakra-ui/react';
import { StoreModel } from '../model';
import { IBook } from '../types/books';
import BookItem from '../components/BookItem';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';

const Book: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<IBook | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const auth = useStoreState((state: StoreModel) => state.user.auth);
  const [error, setError] = useState<boolean>();
  const getBook = useStoreActions((actions: Actions<StoreModel>) => actions.books.getBook);
  const history = useHistory();
  const getBookData = async () => {
    try {
      setLoading(true);
      const data = await getBook(id);
      if (data) {
        setData(data.book);
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
    getBookData();
  }, [history, id]);
  if (data) {
    return (
      <>
        <Box p={5} flex={1}>
          <NavBar tittle="Book description" />
        </Box>
        <Container maxW="container.lg" p={0}>
          <Box bg="white" flex={2} p={6} rounded="md" maxW="1000px">
            <BookItem
              boxSize="250px"
              publisher={data.publisher}
              synopsis={data.synopsis}
              tittle={data.tittle}
              author={data.author}
              pageCount={data.pageCount}
              id={data.id}
              coverImageUrl={data.coverImageUrl}
            />
          </Box>
        </Container>
      </>
    );
  }
  return <>{loading && <Loader />}</>;
};

export default Book;
