import { Container } from './styles'
import PropTypes from 'prop-types'

export function Input({ icon: Icon, isOnLogin=false, ...rest }) {
  return (
    <Container 
      $isonlogin={isOnLogin}
    >
      {Icon && <Icon size={20} />}
      <input {...rest} />
    </Container>
  )
}

Input.propTypes = {
  icon: PropTypes.elementType,
  isOnLogin: PropTypes.bool
}