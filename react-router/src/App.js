import {
  createBrowserRouter,
  RouterProvider,
  // createRoutesFromElements,
  // Route,
} from 'react-router-dom';
import HomePage from './pages/Home';
import ProductsPage from './pages/Product';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import ProductDetailPage from './pages/ProductDetail';

// const routerDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path='/' element={<HomePage />} />
//     <Route path='/products' element={<ProductsPage />} />
//   </Route>
// );

// const router = createBrowserRouter(routerDefinitions);

const router = createBrowserRouter([
  // Layout

  // * /로 시작하면 절대 경로이다.
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      // * 인덱스 라우트는 부모 라우트가 활성이면 표시된다.

      {
        path: 'products',
        element: <ProductsPage />,
        // * 상대 경로로 된 자녀 라우트는 부모 라우트의 경로를 기반으로 한다.
      },
      {
        path: 'products/:productId',
        element: <ProductDetailPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
