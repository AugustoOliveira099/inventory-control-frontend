import { BrowserRouter } from 'react-router-dom'
import { useAuth } from '../hooks/auth'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'
import { AdminRoutes } from './admin.routes'
import { ModalAlert } from '../components/ModalAlert'

import { useEffect, useState } from 'react'

export function Routes() {
  const { user, signOut } = useAuth()
  const [ Element, setElement] = useState(null)
  const [alertMsg, setAlertMsg] = useState('')

  useEffect(() => {
    if (user) {
      if (user.is_admin) {
        setElement(<AdminRoutes />)
      } else if (user.is_active) {
        setElement(<AppRoutes />)
      } else {
        signOut()
        setElement(null)
      }
    } else {
      setElement(null)
    }
  }, [user])

  return (
    <BrowserRouter >
      {user ? Element : <AuthRoutes />}

      <ModalAlert 
        setContent={setAlertMsg} 
        content={alertMsg}
      />
    </BrowserRouter>
  )
}