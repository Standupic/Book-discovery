import { Box, Flex, Text, Heading, Image, Button } from '@chakra-ui/react';
import * as React from 'react';
import { FC } from 'react';
import { IBook } from '../types/books';

const Book: FC<IBook & { IsVisibleButton?: boolean }> = (props) => {
  const { tittle, author, coverImageUrl, publisher, synopsis, pageCount, IsVisibleButton } = props;
  return (
    <>
      <Flex justifyContent={'space-between'} p={3} maxHeight="330px" border="1px solid #f1e9e9">
        <Box>
          <Image src={coverImageUrl} maxWidth="100%" maxHeight="100%" w="250px" h="inherit" />
        </Box>
        <Box flex="1" display="flex" flexDirection="column" px={3}>
          <Heading as="h1">{tittle}</Heading>
          <Text fontSize="md" fontWeight="bold">{`Autor: ${author}`}</Text>
          <Text fontSize="md" fontWeight="bold">{`Publisher: ${publisher}`}</Text>
          <Text fontSize="md" fontWeight="bold">{`Pages: ${pageCount}`}</Text>
          <Box height="200px">
            <Text
              fontSize="sm"
              overflow="hidden"
              text-overflow="ellipsis"
              white-space="pre-wrap"
              maxHeight="130px"
              overflow-wrap="break-word">
              {`${synopsis}`}
            </Text>
          </Box>
          {IsVisibleButton && (
            <Button p={2} colorScheme="teal" margin="auto 0 0">
              Read more
            </Button>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Book;
