# Authentication

## 인증 종류

- 서버사이드 셰션

  - 사용자 로그인 -> 인증됨 -> 서버에 고유 식별자를 저장함 -> 보호된 리소스 접근 권한 여부 확인

- 인증 토큰

  - 사용자가 인증 받은 다음 유효한 자격 증명을 전송한 뒤, 허가 토큰을 생성한다.  
    생성된 토큰이 백엔드에서 만들어졌는지 확인하고, 보호된 리소스 접근 권한 여부를 결정한다.

## 쿼리 파라미터

- 쿼리 파라미터란 URL에서 ? 뒤에 붙는 매개변수이다.

  - 쿼리 파라미터를 사용하면, 페이지를 가입 혹은 로그인 모드에 직접 연결할 수 있다.

        - `useSearchParams`훅을 사용하면 쿼리 파라미터에 접근할 수 있다.
          - `useSearchParams`는 배열을 리턴하며, 구조 분해 할당시,
            - 첫 번째 요소는 쿼리 파리미터에 대한 접근권을 주는 객체이며,
              두 번째 요소는 현재 설정된 쿼리 파라미터를 업데이트 하게 해주는 함수이다.
              - 첫 번째 요소의 `get()` 메소드는 특정 쿼리 파라미터의 값을 가져올 수 있게 해준다.

        ```jsx
        const [searchParams, setSearchParams] = useSearchParams();
        const isLogin = searchParams.get('mode') === 'login';

        return (
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new User' : 'Login'}
          </Link>
        );
        ```

## action 함수에서 searchParams에 접근하기

- `URL` 생성자를 사용하면, `requset.url` 에 인스턴스화 된 객체의 `searchParams`객체에 접근할 수 있다.

  ```jsx
  export const action = async ({ requset }) => {
    const searchParams = new URL(requset.url).searchParams;
    const mode = searchParams.get('mode') === 'login';
    // 기본 값 login

    const data = await requset.formData();
    const authData = {
      email: data.get('email'),
      password: data.get('password'),
    };
  };
  ```

## 토큰

- 토큰을 저장할 때 저장 공간으로 메모리, 쿠키, 로컬스토리지를 고려해볼 수 있다.

### 토큰을 전역에서 관리하기

- React `useContext` 훅을 사용하는 방법

- React Router의 `loader`를 사용하는 방법

  - 로그아웃시, React Router에 의해 재평가 된다.
  - loader를 사용해 받아온 토큰은 항상 최신의 상태를 가르킨다.

  - `loader`를 사용해, 사용자의 인증 상태의 조건에따라 화면을 렌더링할 수 있다.
    - 인증 유무에 따라 라우트 접근 여부를 설정할수도 있다.
