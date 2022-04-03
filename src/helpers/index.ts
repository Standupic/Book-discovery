import { Actions } from 'easy-peasy';
import { default as api, CancelTokenSource, AxiosError } from 'axios';
import { Credential, IUserAPI } from '../types/user';
import { User } from '../model/user';
import axios from '../api';
import { setStorageValue, STORAGE_KEYS } from '../services/localStorage';
import { FormMode } from '../components/Form';

const { CancelToken } = api;

export const sigInUp = async (
  url: string,
  payload: Credential,
  actions: Actions<User>,
  mode: FormMode,
) => {
  const { setLoading, setError, setUser } = actions;
  setLoading(true);
  try {
    const { data } = await axios.post<IUserAPI>(url, payload);
    const {
      user: { token },
    } = data;
    const { user } = data;
    setLoading(false);
    setUser(user);
    setStorageValue(STORAGE_KEYS.token, token);
  } catch (e: any) {
    if (mode === FormMode.signIn) {
      setError('Username or password is invalid');
    }
    if (mode === FormMode.signUp) {
      setError("Password can't be blank");
    }
  }
  setLoading(false);
};

export const cancelableFetch = {
  isCanceled: (error: AxiosError) => {
    return api.isCancel(error);
  },
  create: (fn: (signal: CancelTokenSource, ...args: any[]) => void, params: any) => {
    let source = CancelToken.source();
    return {
      fetch: <T>(...args: T[]) => {
        if (params.shouldCancelPrevRequest) {
          console.log('cancel');
          source.cancel('cancel previously request');
        }
        source = CancelToken.source();
        return Promise.resolve(fn(source, args));
      },
    };
  },
};
