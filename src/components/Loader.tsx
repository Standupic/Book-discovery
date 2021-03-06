import { Box, Flex, Spinner } from '@chakra-ui/react';
import * as React from 'react';

const Loader = () => {
  return (
    <Flex align="center" justify="center" h="100vh" w="100wh" alignSelf="center">
      <Box p={6} rounded="md" textAlign="center">
        <Spinner textAlign="center" />
      </Box>
    </Flex>
  );
};

export default Loader;
