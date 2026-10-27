import { Route, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { Products } from './pages/Products/Products'
import { ProductDetail } from './pages/ProductDetail/ProductDetail'
import { Cart } from './pages/Cart/Cart'
import { Checkout } from './pages/Checkout/Checkout'
import { Admin } from './pages/Admin/Admin'

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </>
  )
}

export default App
