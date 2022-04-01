import { Flex, Text, Heading, Image, Button, GridItem, Grid } from '@chakra-ui/react';
import * as React from 'react';
import { FC } from 'react';
import { IBook } from '../types/books';

const Book: FC<IBook & { IsVisibleButton?: boolean }> = (props) => {
  const { title, author, coverImageUrl, publisher, synopsis, pageCount, IsVisibleButton } = props;
  return (
    <>
      <Grid templateRows="repeat(2, 1fr)" templateColumns="repeat(2, 1fr)" gap={1}>
        <GridItem bg="tomato" colSpan={2} rowSpan={2}>
          <Heading as="h4" overflow="hidden" text-overflow="ellipsis" white-space="nowwrap">
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
              h="inherit"
              fontSize="sm"
              overflow="hidden"
              text-overflow="ellipsis"
              white-space="nowwrap">
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
      {/*<Flex*/}
      {/*  justifyContent={'space-between'}*/}
      {/*  direction={'column'}*/}
      {/*  p={3}*/}
      {/*  height="100%"*/}
      {/*  flex={1}*/}
      {/*  border="1px solid #f1e9e9">*/}
      {/*  <Box>*/}
      {/*    <Heading as="h3">{title}</Heading>*/}
      {/*  </Box>*/}
      {/*  <Flex flex={1}>*/}
      {/*    <Box flex={1}>*/}
      {/*      <Image src={coverImageUrl} maxWidth="100%" maxHeight="100%" w="250px" />*/}
      {/*    </Box>*/}
      {/*    <Box flex={1} display="flex" flexDirection="column" px={3}>*/}
      {/*      <Text fontSize="md" fontWeight="bold">{`Autor: ${author}`}</Text>*/}
      {/*      <Text fontSize="md" fontWeight="bold">{`Publisher: ${publisher}`}</Text>*/}
      {/*      <Text fontSize="md" fontWeight="bold">{`Pages: ${pageCount}`}</Text>*/}
      {/*      <Box height="200px">*/}
      {/*        <Text*/}
      {/*          fontSize="sm"*/}
      {/*          overflow="hidden"*/}
      {/*          text-overflow="ellipsis"*/}
      {/*          white-space="pre-wrap"*/}
      {/*          maxHeight="130px"*/}
      {/*          overflow-wrap="break-word">*/}
      {/*          {`${synopsis}`}*/}
      {/*        </Text>*/}
      {/*      </Box>*/}
      {/*    </Box>*/}
      {/*    {IsVisibleButton && (*/}
      {/*      <Button p={2} colorScheme="teal" margin="auto 0 0">*/}
      {/*        Read more*/}
      {/*      </Button>*/}
      {/*    )}*/}
      {/*  </Flex>*/}
      {/*</Flex>*/}
    </>
  );
};

export default Book;
