import { Container } from "./styles"
import { useNavigate } from 'react-router-dom'
import { AiOutlineLeft } from "react-icons/ai";

export function Back() {
  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  return (
    <Container onClick={handleBack}>
      <AiOutlineLeft />
      <strong>Voltar</strong>
    </Container>
  )
}