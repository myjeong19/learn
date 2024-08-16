export type User = {
  name: string;
  age: number;
  country: string;
  books: string[];
};

export type UserInfoProps = {
  user?: User;
};

export default function UserInfo(props: UserInfoProps) {
  const { user } = props;
  return user ? (
    <>
      <h2>{user.name}</h2>
      <p>Age: {user.age} years</p>
      <p>Country: {user.country}</p>
      <h2>Books</h2>
      <ul>
        {user.books.map(book => (
          <li key={book}> {book} </li>
        ))}
      </ul>
    </>
  ) : (
    <h1>Loading...</h1>
  );
}
