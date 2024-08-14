import { Authors } from '../../../../assets/data/authors';
import { Books } from '../../../../assets/data/books';

export type RegularListProps = {
  items: Authors[] | Books[];
  sourceName: 'author' | 'book';
  ItemComponent: (props: any) => React.ReactElement;
};

export default function RegularList(props: RegularListProps) {
  const { items, sourceName, ItemComponent } = props;

  return (
    <>
      {items.map((item, index: number) => (
        <ItemComponent key={'*' + index} {...{ [sourceName]: item }} />
      ))}
    </>
  );
}
