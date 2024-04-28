import { useQuery } from '@tanstack/react-query';
// TanstackQuery 팀에서 만든 커스텀 훅

import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';

import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  let content;

  if (isPending) {
    // * 응답을 기다리는 동안 로딩 인디케이터 표시
    content = <LoadingIndicator />;
  }

  if (isError) {
    // *  isError 가 True 일 경우, 표시
    content = (
      <ErrorBlock
        title="An error occurred"
        message={error.info?.message || 'Failed to fetch events.'}
      />
    );
    // * error.info: error 객체에 추가된 오류에 대한 정보
  }

  if (data) {
    content = (
      <ul className="events-list">
        {data.map(event => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="content-section" id="new-events-section">
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
