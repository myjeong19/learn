import { type RegularListProps } from './regular-list';

export default function NumberedList(props: RegularListProps) {
  const { items, sourceName, ItemComponent } = props;

  return (
    <>
      {items.map((item, index: number) => (
        <>
          <h3>{index + 1}</h3>
          <ItemComponent key={'*' + index} {...{ [sourceName]: item }} />
        </>
      ))}
    </>
  );
}
