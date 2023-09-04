import { useState } from "react";
import { FiMail, FiLock } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { api } from '../../services/api'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { ModalAlert } from '../../components/ModalAlert'

import logo from '../../assets/logo.svg'

import { Container, Form, Logo } from './styles'

export function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [firstPassword, setFirstPassword] = useState('')
  const [secondPassword, setSecondPassword] = useState('')

  const [alertMsg, setAlertMsg] = useState('')
  const [back, setBack] = useState(false)

  function handleSignUp() {
    if (!name || !email || !firstPassword || !secondPassword) {
      return setAlertMsg("Preencha todos os campos.")
    }

    if (firstPassword !== secondPassword) {
      setFirstPassword('')
      setSecondPassword('')
      return setAlertMsg('As senhas digitadas não são iguais.')
    }

    if (firstPassword.length < 6) {
      setFirstPassword('')
      setSecondPassword('')
      return setAlertMsg('A senha precisa ter no mínimo 6 caracteres.')
    }

    api.post('/users', { name, email, password: firstPassword })
    .then(() => {
      setAlertMsg('Usuário cadastrado com sucesso!')
      setBack(true)
    })
    .catch( (error) =>{
      if (error.response) {
        setAlertMsg(error.response.data.message)
      } else {
        setAlertMsg('Não foi possível cadastrar este usuário. Por favor, tente novamente.')
      }
    })
  }


  return (
    <Container>
      <Logo>
        <img src={logo} alt="Logo da Mac Storee" />
        <h1>mac storee</h1>
      </Logo>

      <Form>
        <h2>Crie sua conta</h2>

        <Input 
          placeholder="Nome"
          type="text"
          icon={FiMail}
          isOnLogin
          onChange={e => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSignUp()
            }
          }}
        />

        <Input 
          placeholder="E-mail"
          type="email"
          icon={FiMail}
          isOnLogin
          onChange={e => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSignUp()
            }
          }}
        />

        <Input 
          placeholder="Senha (no mínimo 6 caracteres)"
          type="password"
          icon={FiLock}
          isOnLogin
          value={firstPassword}
          onChange={e => setFirstPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSignUp()
            }
          }}
        />

        <Input 
          placeholder="Confirme a senha"
          type="password"
          icon={FiLock}
          isOnLogin
          value={secondPassword}
          onChange={e => setSecondPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSignUp()
            }
          }}
        />

        <Button title="Entrar" onClick={handleSignUp} />

        <Link to="/">
          Já tenho uma conta
        </Link>
      </Form>

      <ModalAlert 
        setContent={setAlertMsg} 
        content={alertMsg}
        back={back} 
      />
    </Container>
  )
}