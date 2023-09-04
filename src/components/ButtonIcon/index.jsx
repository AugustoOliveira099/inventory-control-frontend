import { Container } from './styles'
import PropTypes from 'prop-types';

export function ButtonIcon({ icon: Icon, title, loading=false, isOrange: isorange=true, ...rest }) {
  return (
    <Container
      type='button'
      disabled={loading}
      $isorange={isorange}
      {...rest}
    >
        { Icon &&
          <Icon />
        }
       {loading ? 'Carregando...' : title}
    </Container>
  )
}

ButtonIcon.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  icon: PropTypes.elementType,
  isOrange: PropTypes.bool
}