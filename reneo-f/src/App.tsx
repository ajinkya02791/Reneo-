import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import ProductDetails from './Pages/ProductDetails'
import CartPage from './Pages/Cart'

function App() {

  return (
    <BrowserRouter >
    <Routes>
      
    <Route path='/'  element={<Home />}/>
    <Route path='/products/:productID' element={<ProductDetails />} />
    <Route path='/cart' element={<CartPage />} />
    </Routes> 
    </BrowserRouter>
  )
}

export default App