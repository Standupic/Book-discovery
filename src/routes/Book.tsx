import { FC } from 'react';
import { useStoreState } from 'easy-peasy';
import { Box, Container, Flex } from '@chakra-ui/react';
import { StoreModel } from '../model';
import BookItem from '../components/BookItem';
import Loader from '../components/Loader';
import NavBar from '../components/NavBar';

const Book: FC = () => {
  const { loading } = useStoreState((state: StoreModel) => state.books);
  const currentBook = useStoreState((state: StoreModel) => state.books.currentBook);
  // @ts-ignore
  const { publisher, synopsis, title, author, pageCount, id, coverImageUrl } = currentBook;
  if (currentBook) {
    return (
      <>
        <Box p={5}>
          <NavBar tittle="Book description" />
        </Box>
        <Flex align="center" justify="center" h="100vh">
          <Container minW="container.lg" p={0}>
            <Box bg="white" flex={2} p={6} rounded="md" maxW="1000px">
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
        </Flex>
      </>
    );
  }
  return <>{loading && <Loader />}</>;
};

export default Book;
