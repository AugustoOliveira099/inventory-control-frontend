import { useState } from "react";
import { FiMail, FiLock } from 'react-icons/fi'
import { DiApple } from 'react-icons/di'
import { Link } from 'react-router-dom'

import { useAuth } from '../../hooks/auth'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { ModalAlert } from '../../components/ModalAlert'

import { Container, Form, Logo } from './styles'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, alertMsg, setAlertMsg } = useAuth()

  function handleSignIn() {
    signIn({ email, password })
  }

  return (
    <Container>
      <Logo>
        <DiApple size={60} />
        <h1>mac storee</h1>
      </Logo>

      <Form>
        <h2>Faça login</h2>

        <Input 
          placeholder="Digite seu e-mail"
          type="email"
          icon={FiMail}
          isOnLogin
          onChange={e => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSignIn()
            }
          }}
        />

        <Input 
          placeholder="Digite sua senha"
          type="password"
          icon={FiLock}
          isOnLogin
          onChange={e => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSignIn()
            }
          }}
        />

        <Button title="Entrar" onClick={handleSignIn} />

        <Link to="/password">
          Esqueci minha senha
        </Link>
      </Form>

      <ModalAlert
        setContent={setAlertMsg} 
        content={alertMsg}
      />
    </Container>
  )
}