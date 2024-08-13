export const RegularList = ({ items, sourceName, ItemComponents }) => {
  return (
    <>
      {items.map((item, index) => (
        <ItemComponents key={index} item={item} {...{ [sourceName]: item }} />
      ))}
    </>
  );
};
