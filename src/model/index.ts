import user, { User } from '../model/user';

export interface StoreModel {
  user: User;
}

const model: StoreModel = {
  user,
};

export default model;
