import { Container } from './styles'
import PropTypes from 'prop-types'

export function InputText({ icon: Icon, isOnLogin=false, title, id, gridArea='', width, isDate=false, ...rest }) {
  const widthStyle = width ? { width: `${width}`} : { width: '100%'}

  return (
    <Container
      $isonlogin={isOnLogin}
      $gridarea={gridArea}
      $isdate={isDate}
    >
      <label htmlFor={id} >
        <p>{title}</p>
      </label>  
      <div className="input">
        {Icon && <Icon size={20} />}
        <input
        id={id} 
        style={widthStyle}
        {...rest} 
      />
      </div>
    </Container>
  )
}

InputText.propTypes = {
  icon: PropTypes.elementType,
  isOnLogin: PropTypes.bool,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  gridArea: PropTypes.string,
  isDate: PropTypes.bool,
  width: PropTypes.string
}