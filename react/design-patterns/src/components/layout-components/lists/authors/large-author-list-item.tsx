import { type SmallAuthor } from './small-author-list-item';

type LargeAuthor = {
  country: string;
  books: string[];
} & SmallAuthor;

type LargeListItem = {
  author: LargeAuthor;
};

type Book = {
  book: string;
};

type BooksProps = {
  books: string[];
};

function Book(props: Book) {
  const { book } = props;

  return <li>{book}</li>;
}

export function Books(props: BooksProps) {
  const { books } = props;

  return (
    <ul>
      {books.map((book: string, index: number) => (
        <Book key={'+' + index} book={book} />
      ))}
    </ul>
  );
}

export default function LargeAuthorListItem(props: LargeListItem) {
  const { author } = props;

  return (
    <>
      <h2>{author.name}</h2>
      <p>AEG. {author.age}</p>
      <p>COUNTRY. {author.country}</p>
      <Books books={author.books} />
    </>
  );
}
