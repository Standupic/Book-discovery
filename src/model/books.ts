import { action, Action, thunk, Thunk } from 'easy-peasy';
import { IBook, IBooksAPI } from '../types/books';
import axios from '../api';

export interface Books {
  books: IBook[] | [];
  fetchBooks: Thunk<Books>;
  getBook: Thunk<Books, string>;
  searchBooks: Thunk<Books, string>;
  setBooks: Action<Books, IBook[]>;
  setLoading: Action<Books, boolean>;
  setError: Action<Books, boolean>;
  loading: boolean;
  error: boolean;
}

const books: Books = {
  books: [],
  error: false,
  loading: false,
  setBooks: action((state, payload) => {
    state.books = payload;
  }),
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  fetchBooks: thunk(async (actions): Promise<IBooksAPI[] | false | undefined> => {
    try {
      actions.setLoading(true);
      const { data } = await axios.get('/books');
      if (data) {
        actions.setBooks(data.books);
        return data;
      }
    } catch (e) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  }),
  getBook: thunk(async (actions, payload: string) => {
    try {
      actions.setLoading(true);
      const { data } = await axios.get(`/books/${payload}`);
      if (data) {
        const {
          book: { id },
        } = data;
        if (id) {
          return {
            id,
            book: data.book,
          };
        }
      }
    } catch (e) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  }),
  searchBooks: thunk(async (actions, payload: string) => {
    try {
      actions.setLoading(true);
      const { data } = await axios.get(`/books/`, {
        params: {
          q: payload,
        },
      });
      if (data) {
        actions.setBooks(data.books);
      }
    } catch (e) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  }),
};

export default books;
