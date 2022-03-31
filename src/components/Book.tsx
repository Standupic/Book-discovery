import { useHistory, useParams } from 'react-router-dom';
import { FC } from 'react';
import BookItem from './BookItem';

const Book: FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  console.log(id);
  return <>Book</>;
};

export default Book;
