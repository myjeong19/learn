import { Link } from 'react-router-dom';

const PRODUCT = [
  { id: 'p1', title: 'Product 1' },
  { id: 'p2', title: 'Product 2' },
  { id: 'p3', title: 'Product 3' },
];

const ProductsPage = () => {
  return (
    <>
      <h1>The Product Page</h1>
      <ul>
        {PRODUCT.map(product => (
          <li key={product.id}>
            <Link to={product.id}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ProductsPage;
