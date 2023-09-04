import { Container, Modal } from "./styles"
import { Button } from '../Button'
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export function ModalAlert({ content, setContent, back=false }) {
  const [isOpen, setIsOpen] = useState(false)
  const overlayStyle = isOpen ? { display: 'flex' } : { display: 'none' }

  const navigate = useNavigate()

  const handleToggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    handleToggleModal()
    setContent('')

    if (back) {
      navigate('/')
    }
  }

  useEffect(() => {
    if (content !== '') {
      handleToggleModal()
    }
  }, [content])

  return (
    <Container 
      className="modal-overlay" 
      style={overlayStyle}
    >
      <Modal>
        <div className="modal-content">
          <p>{content}</p>
        </div>
        <footer>
          <Button title="Fechar" onClick={handleClose} />
        </footer>
      </Modal>
    </Container>
  )
}

ModalAlert.propTypes = {
  back: PropTypes.bool,
  setContent: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired
}