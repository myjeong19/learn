# 리액트 애플리케이션 배포

## 배포 과정

1. 테스트 코드 (Test Code)

   - 배포이전, 앱이 제대로 동작하는지 확인하는 단계
     - 에러를 제대로 처리할 수 있는가 확인

2. 최적화 (Optimize Code)

   - 코드에 최적화 가능한 부분이 있는지 확인하는 단계
     - 지연 로딩 가능 여부

3. 프로덕션용 앱 빌드 (Build App for Production)

   - `yarn build`
     - 작성된 코드를 가능한 작은 크기로 최적화함

4. 서버에 업로드 (Upload Production Code to Server)

5. 설정 (Configure Server)
   - 서버 또는 호스팅할 제품을 설정하는 단계

## 지연로딩 (Lazy Loaging)

- 지연로딩은 특정 코드를 필요할 때만 로딩하는 테크닉이다.

  - 프로젝트는 어떻게 지연로딩 없이, 빌드 되고 사용자에게 전달되는가?

    - `import`이 포함된 코드에 다른 파일들의 코드가 어떻게 import 되는가?
      - import 된 코드는 import한 컴포넌트 내부에서 랜더링 된다.  
        즉, import문들이 다 처리되기 전 import가 완료되어야 된다.
        - 이때, 문제는 화면에 렌더링 하기 전에, 모든 코드 파일이 불러와져야 한다는 점이며,  
          이러한 점은 초기 로딩 시간을 지연시키게 된다.

- React의 훅인 `useMemo`를 사용할 수도 있다.

- import문은 컴포넌트가 실행 될때 항상 먼저 로딩된다.

### `loader`를 지연 로딩 하는 방법

- loder에 함수를 정의해 호출하기
  - import 함수는 Promise를 반환한다.
  - `loader` 에서 비동기 프로세스를 처리해야하기 때문에, 시간 지연을 발생시킬 수 있다.

```jsx
children: [
  {
    index: true,
    element: <BlogPage />,
    loader: () => import('./pages/Blog').then(module => module.loader()),
    // async, await을 사용할 수도 있다.
    // 이 코드는 BlogPager의 loader가 호출 될 때만 실행된다.
  },
];
```

### `<Component/>`를 지연 로딩 하는 방법 `lazy`

- 리액트 훅인 `lazy`는 호출 시, 동적으로 import 하는 함수를 인자로 받는다.

```jsx
const BlogPage = lazy(() => import('./pages/Blog'));
```

## `yarn build`

- `yarn build`는, 최적화된 프로덕션 빌드를 생성한다.

- React 코드만 배포할 시, Vercel, Netlify, Firebase Hosting을 고려해볼 수 있다.
- React SPA는 정적 웹 사이트이다.

## 리액트 애플리케이션을 배포 후, 도메인 뒤에 /posts 를 추가한 URL을 입력하면 어떻게 될까?

1. 사용자가 브라우저에 URL을 입력하면, 기술적으로 브라우저는 서버에 요청을 보낸다.
   - 즉, 브라우저에 URL 요청하면, 웹 사이트에 요청을 보내게 된다.
2. 서버는 리액트 애플리케이션을 전달한다.
   - 서버는 기본적으로, 항상 동일한 파일을 반환하지 않고, 요청에 해당하는 파일을 찾아 반환한다.
   - 하지만, 리액트 애플리케이션만 반환하는 경우, 서버 측에서 해당 로직을 처리하는 로직이 없으므로, 해당하는 파일을 찾는데 실패하고,
     언제나 동일한 HTML 파일과 JS 코드를 반환하기에, 클라이언트에서 요청한 JS코드를 React Router가 처리하게 만들어야 한다.
