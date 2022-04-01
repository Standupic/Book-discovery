import { persist } from 'easy-peasy';
import user, { User } from '../model/user';
import books, { Books } from '../model/books';

export interface StoreModel {
  user: User;
  books: Books;
}

const model: StoreModel = {
  user: persist(user),
  books: persist(books),
};

export default model;
