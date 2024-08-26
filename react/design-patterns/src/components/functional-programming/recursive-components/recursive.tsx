import { type MyNestedObject, type NestedInnerObject } from './parent';

type RecursiveComponentProps = {
  data: MyNestedObject | NestedInnerObject;
};

export default function RecursiveComponent(props: RecursiveComponentProps) {
  const { data } = props;

  if (typeof data === 'string') {
    return <li>string: {data}</li>;
  }

  const pairs = Object.entries(data);

  return (
    <>
      {pairs.map(([key, value]) => (
        <li>
          {key}:
          <ul>
            <RecursiveComponent data={value} />
          </ul>
        </li>
      ))}
    </>
  );
}
