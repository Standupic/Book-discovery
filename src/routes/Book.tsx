import { FC } from 'react';
import { useStoreState } from 'easy-peasy';
import { Box, Container } from '@chakra-ui/react';
import { StoreModel } from '../model';
import BookItem from '../components/BookItem';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';

const Book: FC = () => {
  const { loading } = useStoreState((state: StoreModel) => state.books);
  const currentBook = useStoreState((state: StoreModel) => state.books.currentBook);
  if (currentBook && currentBook.result) {
    const { publisher, synopsis, title, author, pageCount, id, coverImageUrl } = currentBook.result;
    return (
      <>
        <Box p={5}>
          <NavBar tittle="Book description" />
        </Box>
        <Container>
          <Box bg="white" flex={2} p={6} rounded="md" maxW="600px">
            <BookItem
              publisher={publisher}
              synopsis={synopsis}
              title={title}
              author={author}
              pageCount={pageCount}
              id={id}
              coverImageUrl={coverImageUrl}
            />
          </Box>
        </Container>
      </>
    );
  }
  return <>{loading && <Loader />}</>;
};

export default Book;
