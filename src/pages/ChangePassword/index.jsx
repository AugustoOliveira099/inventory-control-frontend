import { useState, useEffect } from "react";
import { FiLock } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'

import { api } from '../../services/api'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { ModalAlert } from '../../components/ModalAlert'

import logo from '../../assets/logo.svg'

import { Container, Form, Logo } from './styles'

export function ChangePassword() {
  const [firstPassword, setFirstPassword] = useState('')
  const [secondPassword, setSecondPassword] = useState('')

  const [alertMsg, setAlertMsg] = useState('')
  const [back, setBack] = useState(false)
  const [loading, setLoading] = useState(false)

  const params = useParams()

  function handleChangePassword() {
    setLoading(true)
    if (!firstPassword || !secondPassword) {
      setLoading(false)
      return setAlertMsg("Preencha todos os campos.")
    }

    if (firstPassword !== secondPassword) {
      setFirstPassword('')
      setSecondPassword('')
      setLoading(false)
      return setAlertMsg('As senhas digitadas não são iguais.')
    }

    if (firstPassword.length < 6) {
      setFirstPassword('')
      setSecondPassword('')
      setLoading(false)
      return setAlertMsg('A senha precisa ter no mínimo 6 caracteres.')
    }

    api.put(`/users/password/${params.hash}`, {password: firstPassword})
    .then(() => {
      setAlertMsg('Senha atualizada com sucesso!')
      setBack(true)
    })
    .catch( (error) => {
      if (error.response) {
        setAlertMsg(error.response.data.message)
      } else {
        setAlertMsg('Erro ao redefinir a sua senha. Tente novamente, por favor.')
      }
    })

    setLoading(false)
  }

  useEffect(() => {
    async function fetchUser() {
      setLoading(true)

      try {
        await api.get(`/users/password/${params.hash}`)
      } catch (error) {
        if (error.response) {
          setAlertMsg(error.response.data.message)
          setBack(true)
        } else {
          setAlertMsg('Erro indesperado com o seu link. Tente novamente, por favor.')
          setBack(true)
        }
      }

      setLoading(false)
    }

    if (params.hash) {
      fetchUser()
    }
  }, [])


  return (
    <Container>
      <Logo>
        <img src={logo} alt="Logo da Mac Storee" />
        <h1>mac storee</h1>
      </Logo>

      <Form>
        <h2>Digite sua nova senha</h2>

        <Input
          placeholder="Senha (no mínimo 6 caracteres)"
          type="password"
          icon={FiLock}
          isOnLogin
          value={firstPassword}
          onChange={e => setFirstPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleChangePassword()
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
              handleChangePassword()
            }
          }}
        />

        <Button title="Atualizar senha" onClick={handleChangePassword} loading={loading} />

        <Link to="/">
          Página de login
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