import { Action, Thunk, action, thunk } from 'easy-peasy';
import { IUserAPI, Credential, IPerson } from '../types/user';
import { sigInUp } from '../helpers';

export interface User {
  auth: boolean;
  user: IPerson;
  registration: Thunk<User, Credential>;
  authorization: Thunk<User, Credential>;
  loading: boolean;
  error: Error | null;
  setUser: Action<User, IPerson>;
  setError: Action<User, Error>;
  setLoading: Action<User, boolean>;
}

const user: User = {
  auth: false,
  loading: false,
  user: {} as IPerson,
  error: null,
  setUser: action((state, payload: IPerson) => {
    state.user = payload;
  }),
  setError: action((state, payload: Error) => {
    state.error = payload;
  }),
  setLoading: action((state, payload: boolean) => {
    state.loading = payload;
  }),
  authorization: thunk(async (actions, payload: Credential) => {
    return sigInUp('auth/login', payload, actions);
  }),
  registration: thunk(async (actions, payload: Credential) => {
    return sigInUp('/auth/register', payload, actions);
  }),
};

export default user;
