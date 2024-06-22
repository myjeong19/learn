export const LargeBookListItem = ({ book }) => {
  const { name, price, title, pages } = book;

  return (
    <>
      <h2>{name}</h2>
      <p>{price}</p>
      <p>Title: {title}</p>
      <p># of PagesL {pages}</p>
    </>
  );
};
