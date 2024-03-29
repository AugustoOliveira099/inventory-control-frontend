import { Routes, Route } from 'react-router-dom'

import { SignIn } from '../pages/SignIn'
import { ForgotPassword } from '../pages/ForgotPassword'
import { ChangePassword } from '../pages/ChangePassword'

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/password" element={<ForgotPassword />} />
      <Route path="/password/:hash" element={<ChangePassword />} />
    </Routes>
  )
}