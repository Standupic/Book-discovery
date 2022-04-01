import { Flex, Text, Heading, Image, Button, GridItem, Grid } from '@chakra-ui/react';
import * as React from 'react';
import { FC } from 'react';
import { Actions, useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';
import { IBook } from '../types/books';
import { StoreModel } from '../model';

const Book: FC<IBook & { IsVisibleButton?: boolean }> = (props) => {
  const { title, author, coverImageUrl, publisher, id, synopsis, pageCount, IsVisibleButton } =
    props;
  const { getBook } = useStoreActions((actions: Actions<StoreModel>) => actions.books);
  const history = useHistory();

  const getBookHandler = async (key: string) => {
    console.log('getBookHandler');
    const book = await getBook(key);
    if (book) {
      history.push(`/books/${book.id}`);
    }
  };

  return (
    <>
      <Grid
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={1}
        onClick={() => {
          getBookHandler(id);
        }}>
        <GridItem colSpan={2} rowSpan={2}>
          <Heading overflow="hidden" text-overflow="ellipsis" white-space="nowrap">
            {title}
          </Heading>
        </GridItem>
        <GridItem rowSpan={1} maxHeight="350px">
          <Image src={coverImageUrl} maxWidth="100%" maxHeight="100%" />
        </GridItem>
        <GridItem rowSpan={1}>
          <Flex direction="column" h="310px">
            <Text fontSize="md" fontWeight="bold">{`Autor: ${author}`}</Text>
            <Text fontSize="md" fontWeight="bold">{`Publisher: ${publisher}`}</Text>
            <Text fontSize="md" fontWeight="bold">{`Pages: ${pageCount}`}</Text>
            <Text
              as="p"
              h="230px"
              fontSize="sm"
              overflow="hidden"
              text-overflow="ellipsis"
              white-space="nowrap">
              {`${synopsis}`}
            </Text>
          </Flex>
          {IsVisibleButton && (
            <Button p={2} colorScheme="teal" width="100%" margin="0 0 auto">
              Read more
            </Button>
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default Book;
