import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';
// * 가장 가까운 loader 데이터에 엑세스할 수 있다.

import EventsList from '../components/EventsList';

function EventsPage() {
  // // * useLoaderData의 도움을 받아, Promise가 산출하는 최종 데이터를 받게된다.
  const { events } = useLoaderData();
  // const data = useLoaderData();
  // const events = data.events;
  // // * 위 코드는 loader 내부 응답 데이터에서 events를 추출한 것과 같다.

  // // if (data.isError) {
  // //   return <p>{data.message}</p>;
  // // }

  // return (
  //   <>
  //     <EventsList events={events} />
  //     {/* <EventsList /> */}
  //   </>
  // );
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {loadedEvents => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');
  // * React Router는 이러한 응답 객체들을 지원하고, 자동으로 데이터를 추출하기 때문에
  // * 여기서 받는 response 라는 응답 객체를 취해서 그걸 loader에서 리턴할 수 있다.
  // * 그렇기 때문에, 수작업으로 데이터를 추출할 필요가 없다.

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw { message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json({ message: 'Could not fetch events.' }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.events;

    // const res = new Response('any data', { status: 201 });
    // ! loader에서 응답을 리턴할 때마다, React Router는
    // ! useLoaderData를 사용할 때 응답에서, 자동으로 데이터를 추출한다.
    // ! 즉, useLoaderData는 loader에서 리턴한 응답의 일부인 응답 데이터가 된다.

    // * 이러한 기능이 존재하는 이유는 브라우저에 내장된 fetch 함수로, 백엔드에 도달하는 방식을 널리 사용하기 때문이다.
    // * fetch함수는 resolving되는 Promise를 반환한다.

    // return res;
    // ! loader는 모든 종류의 데이터를 리턴할 수 있다.
    // ! 그러므로, 응답 객체 또한 리턴할 수 있다.
  }
}

// ! loader 코드는 서버에서 실행되지 않고, 브라우저에서 실행된다.
// ! 이 말은 즉, loader 함수에서 어떤 브라우저 API도 사용할 수 없다는 것을 의미한다.
export function loader() {
  return defer({
    events: loadEvents(),
  });
}

// * 응답 객체란?
// * 최신 브라우저의 내장된 기능으로,
// * 내장된 Response() 생성자 함수를 인스턴스화 해서 새로운 응답 객체를 생성할 수 있다.

// *Response()의 첫번째 인자는, 어떠한 데이터도 받을 수 있다.
// * 두번째 인자는 설정할 수 있는 추가 객체로, 자세히 설정할 수 있게 도와준다.
