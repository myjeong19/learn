import { Outlet } from 'react-router-dom';

import EventsNavigation from '../components/EventsNavigation';

function EventsRootLayout() {
  // * loader()는 정의한 수준보다 낮은 수준의 라우터에서만 사용할 수 있다.

  return (
    <>
      <EventsNavigation />
      <Outlet />
    </>
  );
}

export default EventsRootLayout;
