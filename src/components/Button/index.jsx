import { Container } from './styles'
import PropTypes from 'prop-types';

export function Button({ title, loading = false, isRed: isred=false, ...rest }) {
  return (
    <Container
      type='button'
      disabled={loading}
      $isred={isred}
      {...rest}
    >
      {loading ? 'Carregando...' : title}
    </Container>
  )
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  isRed: PropTypes.bool
}