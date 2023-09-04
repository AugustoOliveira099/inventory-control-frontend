import { useState } from "react";
import { FiMail } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { api } from '../../services/api'

import { Button } from '../../components/Button'
import { InputText } from '../../components/InputText'
import { ModalAlert } from '../../components/ModalAlert'

import logo from '../../assets/logo.svg'

import { Container, Form, Logo } from './styles'

import emailjs from '@emailjs/browser';


export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [alertMsg, setAlertMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [back, setBack] = useState(false)

  async function handleSendEmail() {
    setLoading(true)

    if (!email) {
      setLoading(false)
      return setAlertMsg("Preencha seu email.")
    }

    try {
      const response = await api.post('/users/password', { email })
      const emailContent = response.data
      
      await emailjs.send('service_4htdzwk', 'template_o6v7q81', emailContent, 'ljXctoA6TX6hApm00')

      setAlertMsg('Foi enviada uma mensagem para o e-mail cadastrado com as intruções para atualizar a senha!')
      setBack(true)
    } catch (error) {
      if (error.response) {
        setAlertMsg(error.response.data.message)
      } else {
        setAlertMsg('Erro inesperado. Tente novamente, por favor.')
      }
    }

    setLoading(false)
  }


  return (
    <Container>
      <Logo>
        <img src={logo} alt="Logo da Mac Storee" />
        <h1>mac storee</h1>
      </Logo>

      <Form>
        <h2>Esquici minha senha</h2>

        <InputText
          placeholder="E-mail"
          title="Digite seu email"
          type="email"
          icon={FiMail}
          isOnLogin
          onChange={e => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendEmail()
            }
          }}
        />

        <Button title="Confirmar" onClick={handleSendEmail} loading={loading} />

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