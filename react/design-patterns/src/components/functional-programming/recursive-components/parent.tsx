import RecursiveComponent from './recursive';

export type NestedInnerObject = {
  innerKey1: string;
  innerKey2: {
    innerKey2InnerKey1: string;
    innerKey2InnerKey2: string;
  };
};

export type MyNestedObject = {
  key1: string;
  key2: NestedInnerObject;
  key3: string;
};

const myNestedObject: MyNestedObject = {
  key1: 'key1Value',
  key2: {
    innerKey1: 'key2InnerValue1',
    innerKey2: {
      innerKey2InnerKey1: 'key2InnerKey2InnerKey1',
      innerKey2InnerKey2: 'key2InnerKey2InnerKey2',
    },
  },
  key3: 'key3',
};

export default function ParentRecursive() {
  return <RecursiveComponent data={myNestedObject} />;
}
