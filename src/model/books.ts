import {
  action,
  Action,
  thunk,
  Thunk,
  computed,
  Computed,
  actionOn,
  Actions,
  State,
  ActionOn,
} from 'easy-peasy';
import { CancelTokenSource } from 'axios';
import { IBook, IBooksAPI } from '../types/books';
import axios from '../api';
import { StoreModel } from './index';

export interface Books {
  books: IBook[] | [];
  fetchBooks: Thunk<Books>;
  getBook: Thunk<Books, string>;
  setBookId: Action<Books, string>;
  searchBooks: Thunk<Books, { token: CancelTokenSource; args: any[] }>;
  setBooks: Action<Books, IBook[]>;
  setLoading: Action<Books, boolean>;
  setError: Action<Books, boolean>;
  setSearchStr: Action<Books, string>;
  clearSearchStr: Action<Books>;
  currentBook?: Computed<Books, IBook | undefined>;
  logOutOn: ActionOn<Books, StoreModel>;
  loading: boolean;
  error: boolean;
  id: string | null;
  searchStr: string;
}

const books: Books = {
  books: [],
  error: false,
  loading: false,
  searchStr: '',
  id: null,
  currentBook: computed((state) => state.books.find((book) => book.id === state.id)),
  setBookId: action((state, payload) => {
    state.id = payload;
  }),
  // @ts-ignore
  logOutOn: actionOn(
    (actions, storeActions) => {
      return storeActions.user.logOut;
    },
    (state, target) => {
      state.searchStr = '';
    },
  ),
  clearSearchStr: action((state) => {
    state.searchStr = '';
  }),
  setBooks: action((state, payload) => {
    state.books = payload;
  }),
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  setSearchStr: action((state, payload) => {
    state.searchStr = payload;
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
  searchBooks: thunk(async (actions, payload) => {
    if (typeof payload.args === 'string') {
      actions.setSearchStr(payload.args);
    }
    try {
      actions.setLoading(true);
      const { data } = await axios.get(`/books`, {
        cancelToken: payload.token.token,
        params: {
          q: payload.args,
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
  getBook: thunk(async (actions, payload: string) => {
    try {
      actions.setLoading(true);
      const { data } = await axios.get(`/books/${payload}`);
      if (data) {
        const {
          book: { id },
        } = data;
        if (id) {
          actions.setBookId(id);
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
};

export default books;
