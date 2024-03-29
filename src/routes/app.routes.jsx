import { Routes, Route } from 'react-router-dom'

import { Product } from '../pages/Product'
import { New } from '../pages/New'
import { Home } from '../pages/Home'
import { Profile } from '../pages/Profile'

export function AppRoutes() {
  return (
    <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product/:id" element={<Product />} />
    </Routes>
  )
}