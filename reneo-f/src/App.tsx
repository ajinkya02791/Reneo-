import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import ProductDetails from './Pages/ProductDetails'
import CartPage from './Pages/Cart'
import MainLayout from './Componenets/MainLayout'
import ProductsPage from './Pages/Products'
import { ProductsProvider } from './contextAPI/products'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ForgotPassword from './Pages/ForgotPassword'
import OrderPage from './Pages/Orders'
import LikePage from './Pages/LikedProducts'
import VerifyEmail from './Pages/EmailVerify'
import CustomerProtectedRoute from './Componenets/CustomerProtectedRoute'

function App() {

  return (
    <BrowserRouter >
    <Routes>
    <Route element={<ProductsProvider />} >
    <Route element={<MainLayout />} >
    <Route path='/'  element={<Home />}/>
    <Route path='/products/:productID' element={<ProductDetails />} />
    <Route path='/products' element={<ProductsPage />} />
    <Route element={<CustomerProtectedRoute />} >
    <Route path='/cart' element={<CartPage />} />
    <Route path='/orders' element={<OrderPage />} />
    <Route path='/liked-products' element={<LikePage />} />
    <Route path='/verify-email' element={<VerifyEmail />} />
    </Route>
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/forgot-password' element={<ForgotPassword />} />
    </Route>
    </Route>
    </Routes> 
    </BrowserRouter>
  )
}

export default App