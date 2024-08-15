# Container Components

컨테이너 컴포넌트는 하위 컴포넌트를 대신하여, 데이터 로딩 및 데이터 처를 담당하는 컴포넌트이다.

```jsx
// BEFORE

function Component() {
  const [data, setData] = useState();

  useEffect(() => {...}, []);

  return (
    // Display Data in JSX
  )
}
```

```jsx
// AFTER
function Component() {
  const [data, setData] = useState();

  useEffect(() => {...}, []);

  return (
    // Pass data to children as props
    <ChildrenComponent data={data}/>
  )
}


```

## 주의사항

- 간단한 컴포넌트와 같은 모든 곳에서 사용해서는 안된다.
  - `cloneElement`를 사용해, 일부 데이터를 사용하는 경우, 유지 보수가 덜 될 수 있다.

```jsx
<>
  {React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement < UserComponentProps > (child, { [resourceName]: resource });
    }

    return child;
  })}
</>
```
