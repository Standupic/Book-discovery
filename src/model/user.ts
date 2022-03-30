import { Action, Thunk, action, thunk } from 'easy-peasy';
import { Credential, IPerson } from '../types/user';
import { sigInUp } from '../helpers';
import { FormMode } from '../components/Form';

export interface User {
  auth: boolean;
  user: IPerson;
  signUp: Thunk<User, Credential>;
  signIn: Thunk<User, Credential>;
  loading: boolean;
  error: string | null;
  setUser: Action<User, IPerson>;
  setError: Action<User, string>;
  setLoading: Action<User, boolean>;
}

const user: User = {
  auth: false,
  loading: false,
  user: {} as IPerson,
  error: null,
  setUser: action((state, payload: IPerson) => {
    state.user = payload;
    state.auth = true;
  }),
  setError: action((state, payload: string) => {
    state.error = payload;
  }),
  setLoading: action((state, payload: boolean) => {
    state.loading = payload;
  }),
  signIn: thunk(async (actions, payload: Credential) => {
    sigInUp('/auth/login', payload, actions, FormMode.signIn);
  }),
  signUp: thunk(async (actions, payload: Credential) => {
    sigInUp('/auth/register', payload, actions, FormMode.signUp);
  }),
};

export default user;
