import { Actions } from 'easy-peasy';
import { Credential, IUserAPI } from '../types/user';
import { User } from '../model/user';
import axios from '../api';
import { setStorageValue, STORAGE_KEYS } from '../services/localStorage';

export const sigInUp = async (url: string, payload: Credential, actions: Actions<User>) => {
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
    setError(e);
  }
  setLoading(false);
};
