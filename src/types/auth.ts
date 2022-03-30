interface IPerson {
  id: string;
  username: string;
  token: string;
}

export interface Credential {
  username: string;
  password: string;
}

export interface IUserAPI {
  user: IPerson;
}
