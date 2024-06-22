export const NumberedList = ({ items, sourceName, ItemComponents }) => {
  return (
    <>
      {items.map((item, index) => (
        <>
          <h3>{index + 1}</h3>
          <ItemComponents key={index} item={item} {...{ [sourceName]: item }} />
        </>
      ))}
    </>
  );
};
