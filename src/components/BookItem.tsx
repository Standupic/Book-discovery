import { Box, Flex, Text, Heading, Image } from '@chakra-ui/react';
import * as React from 'react';
import { FC } from 'react';
import { IBook } from '../types/books';

const Book: FC<IBook> = (props) => {
  const { tittle, author, coverImageUrl, id, publisher, synopsis } = props;
  return (
    <>
      <Flex justifyContent={'space-between'} p={3}>
        <Image src={coverImageUrl} boxSize="150px" />
        <Box flex="1" overflow={'hidden'} px={3}>
          <Heading as="h1">{tittle}</Heading>
          <Text fontSize="md" fontWeight="bold">{`Autor ${author}`}</Text>
          <Text fontSize="md" fontWeight="bold">{`Publisher ${publisher}`}</Text>
          <Text fontSize="sm">{`${synopsis}`}</Text>
        </Box>
      </Flex>
    </>
  );
};

export default Book;
