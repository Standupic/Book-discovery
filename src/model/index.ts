import user, { User } from '../model/user';
import books, { Books } from '../model/books';
export interface StoreModel {
  user: User;
  books: Books;
}

const model: StoreModel = {
  user,
  books,
};

export default model;
