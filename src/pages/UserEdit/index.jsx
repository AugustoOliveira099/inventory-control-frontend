import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../hooks/auth"

import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { BsCalendar2Date } from 'react-icons/bs'

import { api } from '../../services/api'

import { Back } from '../../components/Back'
import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { InputText } from '../../components/InputText'
import { ModalAlert } from '../../components/ModalAlert'
import { Header } from '../../components/HeaderAdmin'
import { Footer } from '../../components/Footer'
import { ModalConfirm } from '../../components/ModalConfirm'

import { Container, Form } from './styles'

import { PatternFormat } from "react-number-format";


export function UserEdit() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [firstPassword, setFirstPassword] = useState('')
  const [secondPassword, setSecondPassword] = useState('')
  const [paidAt, setPaidAt] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [staticIsAdmin, setStaticIsAdmin] = useState(false)

  const [confirmMsgEditUser, setConfirmMsgEditUser] = useState('')
  const [confirmMsgChangeAdmin, setConfirmMsgChangeAdmin] = useState('')
  const [alertMsg, setAlertMsg] = useState('')
  const [back, setBack] = useState(false)
  
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const params = useParams()

  function handleSetPaidAt (date) {
    if(!date.includes('_') && date !== '') {
      const [day, mounth, year] = date.split('/')
      setPaidAt(`${year}-${mounth}-${day}`)
    } else {
      setPaidAt('')
    }
    
    setCurrentDate(date)
  }

  function handleSetIsAdmin() {
    setIsAdmin(!isAdmin)
  }

  function handleEditUser() {
    if (!name || !email || !paidAt) {
      return setAlertMsg("Preencha o nome, o vencimento do acesso à conta e o e-mail do usuário.")
    }

    if(firstPassword || secondPassword) {
      if (firstPassword !== secondPassword) {
        setFirstPassword('')
        setSecondPassword('')
        return setAlertMsg('As senhas não são iguais.')
      }

      if (firstPassword.length < 6) {
        setFirstPassword('')
        setSecondPassword('')
        return setAlertMsg('A senha precisa ter no mínimo 6 caracteres.')
      }
    }

    api.put(`/admin/${params.id}`, { name, email, password: firstPassword, paidAt, isAdmin })
    .then(() => {
      setAlertMsg('Informações do usuário editadas com sucesso!')
      setBack(true)
    })
    .catch( (error) => {
      if (error.response) {
        if(error.response.status === 403) {
          navigate('/')
          signOut()
        }
        setAlertMsg(error.response.data.message)
      } else {
        setAlertMsg('Não foi possível cadastrar este usuário. Por favor, tente novamente.')
      }
    })
  }

  useEffect(() => {
    async function fecthUser() {
      try {
        const response = await api.get(`/users/${params.id}`)
        const user = response.data

        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.is_admin)
        setStaticIsAdmin(user.is_admin)

        console.log(user.is_admin)

        const [date,] = user.paid_at.split(' ')
        setPaidAt(date)

        const [year, month, day] = date.split('-')
        setCurrentDate(`${day}/${month}/${year}`)
      } catch(error) {
        if(error.response) {
          if(error.response.status === 403) {
            navigate('/')
            signOut()
          }
          setAlertMsg(error.response.data.message)
        } else {
          console.error(error)
          setAlertMsg('Não foi possível recuperar os dados deste usuário.')
        }
      }
    }

    fecthUser()
  }, [])


  return (
    <Container>
      <Header />

      <div className="register">
        <Back />

        <Form>
          <h2>Editar dados do usuário</h2>

          <Input 
            placeholder="Nome"
            type="text"
            icon={FiUser}
            isOnLogin
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setConfirmMsgEditUser('Tem certeza que deseja alterar as informações deste usuário?')
              }
            }}
          />

          <Input 
            placeholder="E-mail"
            type="email"
            icon={FiMail}
            isOnLogin
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setConfirmMsgEditUser('Tem certeza que deseja alterar as informações deste usuário?')
              }
            }}
          />

          <Input 
            placeholder="Nova senha"
            type="password"
            icon={FiLock}
            isOnLogin
            value={firstPassword}
            onChange={e => setFirstPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setConfirmMsgEditUser('Tem certeza que deseja alterar as informações deste usuário?')
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
                setConfirmMsgEditUser('Tem certeza que deseja alterar as informações deste usuário?')
              }
            }}
          />

          {
            staticIsAdmin === 0 &&
            <PatternFormat 
              format="##/##/####"
              mask="_"
              placeholder="dd/mm/aaaa"
              customInput={InputText}
              icon={BsCalendar2Date}
              id="last-payment"
              title="Último pagamento"
              isOnLogin
              value={currentDate}
              onChange={e => handleSetPaidAt(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setConfirmMsgEditUser('Tem certeza que deseja alterar as informações deste usuário?')
                }
              }}
            />
          }

          <div className="container-checkbox">
            <input 
              id="admin-checkvbox"
              type="checkbox"
              checked={isAdmin}
              onChange={() => { 
                setConfirmMsgChangeAdmin('Tem certeza que deseja alterar o status de administrador deste usuário?') 
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setConfirmMsgChangeAdmin('Tem certeza que deseja alterar o status de administrador deste usuário?')
                }
              }}
            />

            <label htmlFor="admin-checkvbox">
              Administrador
            </label>
          </div>

          <div className="buttons">
            <Button 
              title="Cancelar" 
              onClick={() => { 
                navigate('/') 
              }} 
              isRed
            />
            <Button 
              title="Editar" 
              onClick={() => {
                setConfirmMsgEditUser('Tem certeza que deseja alterar as informações deste usuário?')
              }} 
            />
          </div>
        </Form>
      </div>

      <Footer />

      <ModalAlert 
        setContent={setAlertMsg} 
        content={alertMsg}
        back={back}
      />

      <ModalConfirm
        handleConfirm={handleSetIsAdmin}
        content={confirmMsgChangeAdmin}
        setContent={setConfirmMsgChangeAdmin}
      />

      <ModalConfirm
        handleConfirm={handleEditUser}
        content={confirmMsgEditUser}
        setContent={setConfirmMsgEditUser}
      />
    </Container>
  )
}