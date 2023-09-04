import { FaApple } from 'react-icons/fa'
import { AiFillInstagram } from 'react-icons/ai'

import { Link } from 'react-router-dom'
import { Container, Logo, Reference } from "./styles"

export function Footer() {
  return (
    <Container>
      <div className="footer">
        <Logo>
          <Link to="/">
            <FaApple />
            <h1>mac storee</h1>
          </Link>
        </Logo>

        <Reference>
          <a 
            href="https://www.instagram.com/macstoree_/" 
            target="_blank" 
            className="instagram"
            rel="noreferrer"
          >
            <AiFillInstagram />
            <span>Mac Storee</span>
          </a>
          <span>© 2023 - Todos os direitos reservados.</span>
        </Reference>
      </div>
    </Container>
  )
}