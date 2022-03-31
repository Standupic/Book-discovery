import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Button, FormErrorMessage, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { FC, useCallback, useEffect } from 'react';
import { Actions, useStoreActions, useStoreState } from 'easy-peasy';
import { StoreModel } from '../model';

export enum FormMode {
  signIn = 'signIn',
  signUp = 'signUp',
}

interface IForm {
  mode: FormMode;
}

interface Values {
  username: string;
  password: string;
}

const FormLogin: FC<IForm> = (props) => {
  const { mode } = props;
  const signIn = useStoreActions((actions: Actions<StoreModel>) => actions.user.signIn);
  const signUp = useStoreActions((actions: Actions<StoreModel>) => actions.user.signUp);
  const error = useStoreState((state: StoreModel) => state.user.error);
  const auth = useStoreState((state: StoreModel) => state.user.auth);
  const history = useHistory();
  useEffect(() => {
    if (auth) {
      history.push('/books');
    }
  }, [auth]);
  const onSubmitHandler = useCallback(
    async (values: Values) => {
      const { username, password } = values;
      if (mode === FormMode.signIn) {
        signIn({ username: username, password: password });
      } else {
        signUp({ username: username, password: password });
      }
    },
    [mode],
  );
  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={onSubmitHandler}>
      {({ handleSubmit, isSubmitting, handleChange, values }) => (
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl isInvalid={!!error}>
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  name="username"
                  type="username"
                  variant="filled"
                  onChange={handleChange}
                  value={values.username}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  variant="filled"
                  onChange={handleChange}
                  value={values.password}
                />
              </FormControl>
              <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme="purple" isFullWidth disabled={isSubmitting}>
              Login
            </Button>
          </VStack>
        </form>
      )}
    </Formik>
  );
};

export default FormLogin;
