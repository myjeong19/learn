export type SmallAuthor = {
  name: string;
  age: number;
};

type SmallAuthorListItemProps = {
  author: SmallAuthor;
};

export default function SmallAuthorListItem(props: SmallAuthorListItemProps) {
  const { author } = props;

  return (
    <p>
      NAME: {author.name} AGE: {author.age}
    </p>
  );
}
