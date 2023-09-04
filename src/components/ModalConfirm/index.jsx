import { Container, Modal } from "./styles"
import { Button } from '../Button'
import { useState, useEffect, useCallback } from "react"
import PropTypes from 'prop-types'

export function ModalConfirm({ handleConfirm, content, setContent }) {
  const [isOpen, setIsOpen] = useState(false)
  const overlayStyle = isOpen ? { display: 'flex' } : { display: 'none' }

  const handleToggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    handleToggleModal()
    setContent('')
  }

  useEffect(() => {
    if (content !== '') {
      handleToggleModal()
    }
  }, [content])

  return (
    <Container className="modal-overlay" style={overlayStyle}>
      <Modal>
        <div className="modal-content">
          <p>{content}</p>
        </div>
        <footer>
          <Button title="Cancelar" onClick={handleClose} />
          <Button title="Confirmar" onClick={handleConfirm} />
        </footer>
      </Modal>
    </Container>
  )
}

ModalConfirm.propTypes = {
  back: PropTypes.bool,
  content: PropTypes.string.isRequired,
  setContent: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired
}