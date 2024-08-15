export type Book = {
  name: string;
  price: number;
  title: string;
  pages: number;
};

type BookInfoProps = {
  book?: Book;
};

export default function BookInfo(props: BookInfoProps) {
  const { book } = props;

  return book ? (
    <>
      <h3>{book.name}</h3>
      <p>{book.price}</p>
      <h3>Title: {book.title}</h3>
      <p>Number of Pages: {book.pages}</p>
    </>
  ) : (
    <h1>Loading</h1>
  );
}
