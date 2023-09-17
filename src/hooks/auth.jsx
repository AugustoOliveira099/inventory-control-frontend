import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'
import PropTypes from 'prop-types'

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({})
  const [alertMsg, setAlertMsg] = useState('')

  async function signIn({ email, password }) {
    try {
      const response = await api.post('/sessions', { email, password })
      const { user, token } = response.data;

      localStorage.setItem('@macstoree:user', JSON.stringify(user));
      localStorage.setItem('@macstoree:token', token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setData({ user, token })
    } catch (error) {
      if (error.response) {
        setAlertMsg(error.response.data.message)
      } else {
        console.error(error)
        setAlertMsg('Não foi possível entrar.')
      }
    }
  }

  function signOut() {
    localStorage.removeItem('@macstoree:user')
    localStorage.removeItem('@macstoree:token')

    setData({})
  }

  async function updateProfile({ user, avatarFile }) {
    try {
      if (avatarFile) {
        const fileUploadForm = new FormData()
        fileUploadForm.append('avatar', avatarFile)

        const response = await api.patch('/users/avatar', fileUploadForm)
        user.avatar = response.data.avatar;
      }

      await api.put('/users', user)
      localStorage.setItem('@macstoree:user', JSON.stringify(user))

      setData({ user, token: data.token })
      setAlertMsg('Perfil atualizado!')
    } catch (error) {
      if (error.response) {
        setAlertMsg(error.response.data.message)
      } else {
        console.error(error)
        setAlertMsg('Não foi possível atualizar o perfil.')
      }
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("@macstoree:token")
    const user = localStorage.getItem("@macstoree:user")

    if ( token && user ) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setData({ 
        user: JSON.parse(user), 
        token
      })
    }
  }, [])


  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      updateProfile,
      alertMsg,
      setAlertMsg,
      user: data.user
    }} >
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
}

export { AuthProvider, useAuth }