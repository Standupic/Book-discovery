import { Actions } from 'easy-peasy';
import { Credential, IUserAPI } from '../types/user';
import { User } from '../model/user';
import axios from '../api';
import { setStorageValue, STORAGE_KEYS } from '../services/localStorage';
import { FormMode } from '../components/Form';

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
