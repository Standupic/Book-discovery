export interface IBook {
  title: number;
  author: string;
  coverImageUrl: string;
  id: string;
  publisher: string;
  synopsis: string;
  pageCount: number;
}
export interface IBooksAPI {
  books: IBook[];
}
