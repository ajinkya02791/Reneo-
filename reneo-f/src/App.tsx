import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import ProductDetails from './Pages/ProductDetails'
import CartPage from './Pages/Cart'
import MainLayout from './Componenets/MainLayout'
import Products from './Pages/Products'
import { ProductsProvider } from './contextAPI/products'

function App() {

  return (
    <BrowserRouter >
    <Routes>
    <Route element={<ProductsProvider />} >
    <Route element={<MainLayout />} >
    <Route path='/'  element={<Home />}/>
    <Route path='/products/:productID' element={<ProductDetails />} />
    <Route path='/cart' element={<CartPage />} />
    <Route path='/products' element={<Products />} />
    </Route>
    </Route>
    </Routes> 
    </BrowserRouter>
  )
}

export default App