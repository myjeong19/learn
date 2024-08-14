import { type SmallBook } from './small-book-list-item';

type LargeBook = {
  title: string;
  pages: number;
} & SmallBook;

type LargeBooksListProps = {
  book: LargeBook;
};

export default function LargeBookListItem(props: LargeBooksListProps) {
  const { book } = props;

  return (
    <>
      <h2>{book.name}</h2>
      <p>{book.price}</p>
      <h2>TITLE:</h2>
      <p>{book.title}</p>
      <p># of Pages: {book.pages}</p>
    </>
  );
}
