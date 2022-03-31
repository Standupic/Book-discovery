import { Action, thunk, Thunk, action } from 'easy-peasy';
import { IBook, IBooksAPI } from '../types/books';
import axios from '../api';
import { Credential, IUserAPI } from '../types/user';

export interface Books {
  fetchBooks: Thunk<Books>;
  getBook: Thunk<Books, string>;
}

const books: Books = {
  fetchBooks: thunk(async (actions): Promise<IBooksAPI[] | false | undefined> => {
    try {
      const { data } = await axios.get<IBooksAPI[]>('/books');
      if (data) {
        return data;
      }
    } catch (e) {
      return false;
    }
  }),
  getBook: thunk(async (actions, payload: string) => {
    try {
      const { data } = await axios.get(`/books/${payload}`);
      if (data) {
        return data;
      }
    } catch (e) {
      return false;
    }
  }),
};

export default books;
