import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { productInfoLoader } from 'features/productForm/productForm';
import { ProductDetail } from 'routes/productDetail';
import { ProductList } from 'routes/productList';
import { Root } from 'routes/root';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root />} >
      <Route index element={<ProductList />} />
      <Route path="/producto/nuevo" element={<ProductDetail />} />
      <Route path="/producto/:id" element={<ProductDetail />} loader={productInfoLoader}/>
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  );
}

export default App
