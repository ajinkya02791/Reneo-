import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import ProductDetails from './Pages/ProductDetails'

function App() {

  return (
    <BrowserRouter >
    <Routes>
      
    <Route path='/'  element={<Home />}/>
    <Route path='/products/:productID' element={<ProductDetails />} />
    </Routes> 
    </BrowserRouter>
  )
}

export default App