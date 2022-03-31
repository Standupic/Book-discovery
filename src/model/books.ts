import { thunk, Thunk } from 'easy-peasy';
import { IBooksAPI } from '../types/books';
import axios from '../api';

export interface Books {
  fetchBooks: Thunk<Books>;
  getBook: Thunk<Books, string>;
  searchBooks: Thunk<Books, string>;
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
  searchBooks: thunk(async (actions, payload: string) => {
    try {
      const { data } = await axios.get(`/books/`, {
        params: {
          q: payload,
        },
      });
      if (data) {
        return data;
      }
    } catch (e) {
      return false;
    }
  }),
};

export default books;
