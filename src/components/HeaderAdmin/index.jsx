import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

import { BiLogOut } from 'react-icons/bi'
import { FaApple } from 'react-icons/fa'
import { FiUserPlus } from "react-icons/fi";

import { ModalConfirm } from '../../components/ModalConfirm'

import { useAuth } from '../../hooks/auth'
import { api } from '../../services/api'
import { Container, Profile, Logout, Logo, NewUser, Grid } from './styles'

import avatarPlaceholder from '../../assets/avatar_placeholder.svg'


export function Header() {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const [confirmMsg, setConfirmMsg] = useState('')

  function handleShowModal() {
    setConfirmMsg('Deseja realmente sair da sua conta?')
  }

  function handleSignOut() {
    navigate('/')
    signOut()
  }

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
  const altImg = `Foto de perfil do usuário ${ user.name }`

  return (
    <Container>
      <Logo>
        <Link to="/">
          <FaApple />
          <h1>mac storee</h1>
        </Link>
      </Logo>
      
      <Grid>
        <Profile>
          <Link to="/profile">
            <img 
              src={avatarUrl} 
              alt={altImg}
            />

            <div>
              <span>Bem-vindo(a),</span>
              <strong>{user.name}</strong>
            </div>
          </Link>
        </Profile>

        <NewUser to="/register">
          <FiUserPlus />
          <span>Novo usuário</span>
        </NewUser>

        <Logout onClick={handleShowModal}>
          <BiLogOut />
        </Logout>
      </Grid>

      <ModalConfirm
        handleConfirm={handleSignOut}
        content={confirmMsg}
        setContent={setConfirmMsg}
      />

    </Container>
  )
}