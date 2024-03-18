import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

const RootLayout = () => {
  // * 현재 전환의 상태 혹은 데이터 로딩의 상태를 알 수 있다.
  // * 로딩 인디케이터를 불러 올 수 있는 한 가지 방법이다.

  // ! useEffect()와 차이점
  // ! 로딩 인디케이터는 전환할 목적지인 페이지에 추가 되는 것이 아닌,
  // ! 전환이 시작 되었을 때 이미 화면에 표시되어 있는 페이지, 컴포넌트에 추가된다.
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
