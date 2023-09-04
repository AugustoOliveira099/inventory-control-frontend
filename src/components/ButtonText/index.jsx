import { Container } from "./styles";
import PropTypes from 'prop-types'

export function ButtonText({ title, isActive = false, ...rest }) {
  return (
    <Container 
      type="button"
      $isactive={isActive}
      {...rest}
    >
      {title}
    </Container>
  )
}

ButtonText.propTypes = {
  title: PropTypes.string.isRequired,
  isActive: PropTypes.bool
}