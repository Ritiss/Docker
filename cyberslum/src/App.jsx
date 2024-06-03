import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/Main'
import { Layout } from './components/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Catalog from './pages/Catalog'
import Cart from './pages/Cart'
import Registration from './pages/Registration'
import NotFoundPage from './pages/NotFoundPage'
import Store from './pages/Store'
import Order from './pages/Order'
import { AuthProvider } from "./context/auth"

export default function App() {
  return (
    <AuthProvider>
      <audio id={'bgmusic'} src={`/sounds/LetYouDown.mp4`} loop />
      <Routes>
        <Route index element={<MainPage />} />
        <Route path='/order' element={<Order />} />
        <Route path='/' element={<Layout />}>
          <Route path='home' element={<Home />} />
          <Route path='registry' element={<Registration />} />
          <Route path='profile' element={<Profile />} />
          <Route path='catalog' element={<Catalog />} />
          <Route path='catalog/:type' element={<Store />} />
          <Route path='cart' element={<Cart />} />
        </Route>
        <Route path='/404' element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  )
}
