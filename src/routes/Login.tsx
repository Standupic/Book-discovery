import { Box, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import TabsLogin from '../components/TabsLogin';

const Login: FC = () => {
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md">
        <TabsLogin />
      </Box>
    </Flex>
  );
};

export default Login;
