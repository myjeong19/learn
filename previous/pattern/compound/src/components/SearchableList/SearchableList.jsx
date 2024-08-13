import { useState, useRef } from 'react';

export default function SearchableList({ items, itemKeyFn, children }) {
  const [searchTerm, setSearchTerm] = useState('');
  const lastChange = useRef();

  const searchResults = items.filter(item => JSON.stringify(item).toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));

  function handleChange(event) {
    // 진행중인 타이머가 있을 시, 타이머를 취소하고 새로운 타이머를 설정한다.
    if (lastChange.current) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      // 저장된 타이머 식별자 초기화
      lastChange.current = null;
      setSearchTerm(event.target.value);
    }, 500);
  }

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={handleChange} />

      <ul>
        {searchResults.map((item, index) => (
          <li key={itemKeyFn(item)}>{children(item)}</li>
        ))}
      </ul>
    </div>
  );
}
