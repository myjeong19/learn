import { useParams, Link } from 'react-router-dom';

const ProductDetailPage = () => {
  const params = useParams();

  return (
    <>
      <h1>Product Details</h1>
      <p>{params.productId}</p>
      <p>
        <Link to='..' relative='path'>
          Back
        </Link>
        {/* BackLink */}
        {/* relative의 기본 값은 route */}
        {/* path로 하는 경우, 현재 활성인 경로를 확인하고, 그 경로에서 한 세그먼트만 제거하게 된다. */}
      </p>
    </>
  );
};

export default ProductDetailPage;
