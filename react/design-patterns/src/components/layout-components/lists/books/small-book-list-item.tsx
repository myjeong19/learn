export type SmallBook = {
  name: string;
  price: number;
};

type SmallBookListItemProps = {
  book: SmallBook;
};

export default function SmallBookListItem(props: SmallBookListItemProps) {
  const { book } = props;

  return (
    <h2>
      {book.name} / {book.price}
    </h2>
  );
}
