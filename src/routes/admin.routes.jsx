import { Routes, Route } from 'react-router-dom'

import { HomeAdmin } from '../pages/HomeAdmin'
import { SignUp } from '../pages/SignUp'
import { UserEdit } from '../pages/UserEdit'
import { Profile } from '../pages/Profile'

export function AdminRoutes() {
  return (
    <Routes >
      <Route path="/" element={<HomeAdmin />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/user/:id" element={<UserEdit />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}