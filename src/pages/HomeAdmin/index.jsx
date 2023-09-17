import { useState, useEffect } from "react"
import { useAuth } from '../../hooks/auth'
import { useNavigate } from "react-router-dom"

import { Header } from '../../components/HeaderAdmin'
import { User } from '../../components/User'
import { Footer } from '../../components/Footer'
import { ModalAlert } from '../../components/ModalAlert'
import { Input } from '../../components/Input'

import { FiSearch } from 'react-icons/fi'

import { api } from '../../services/api'

import { Container, Main } from "./styles"


export function HomeAdmin() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [alertMsg, setAlertMsg] = useState('')

  const { signOut } = useAuth()
  const navigate = useNavigate()

  async function handleFetchUsers() {
    try {
      const response = await api.get(`/users?name=${search}&email=${search}`)
      setUsers(response.data)
    } catch (error) {
      if(error.response) {
        if(error.response.status === 403) {
          navigate('/')
          signOut()
        }
        setAlertMsg(error.response.data.message)
      } else {
        console.error(error)
        setAlertMsg('Não foi possível obter a lista de usuários.')
      }
    }
  }

  useEffect(() => {
    handleFetchUsers()
  }, [])

  return (
    <Container>
      <Header />

      <Main>
        <div className="search">
          <Input
            type="text"
            placeholder="Título ou e-mail"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFetchUsers();
              }
            }}
            icon={FiSearch}
          />
        </div>

        <div className="table-header">
          <span>Nome</span>
          <span>E-mail</span>
          <span>Vencimento</span>
          <span>Ativo</span>
          <span>Admin</span>
        </div>
        {
          users.map((user, index) => {
            const isLast = users.length-1 === index

            return (
              <User 
                key={user.id}
                index={index}
                isLast={isLast}
                user={user}
              />
            )
          })
        }
      </Main>
      
      <Footer/>

      <ModalAlert 
        setContent={setAlertMsg} 
        content={alertMsg}
      />
    </Container>
  )
}