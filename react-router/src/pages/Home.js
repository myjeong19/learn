import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/products');
  };

  return (
    <>
      <h1>My Home Page</h1>
      <p>
        Go to
        {/* <a href='/products'>the list of products</a> */}
        {/* 위 방식을 사용하면, 페이지 이동시, 새로고침이 된다. */}
        <Link to='products'>the list of products</Link>
      </p>
      <p>
        <button onClick={handleNavigate}>Navigate</button>
      </p>
    </>
  );
};

export default HomePage;
