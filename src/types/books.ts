export interface Book {
  tittle: number;
  author: string;
  coverImageUrl: string;
  id: number;
  publisher: string;
  synopsis: string;
}
export interface IBooksAPI {
  books: Book[];
}
