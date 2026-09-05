import Footer from './Footer'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Toast from './Toast'
import { useProducts } from '../contextAPI/products'

function MainLayout() {

  const { toast } = useProducts();

  return (
    <>
    <Header />
    <Outlet />
    {toast && <Toast message={toast.message} type={toast.type} />}
    <Footer />
    </>

)
}

export default MainLayout