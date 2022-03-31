import { Box, Flex, Spinner } from '@chakra-ui/react';
import * as React from 'react';

const Loader = () => {
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <Spinner />
      </Box>
    </Flex>
  );
};

export default Loader;
