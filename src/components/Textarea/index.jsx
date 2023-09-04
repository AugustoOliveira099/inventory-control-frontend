import { Container, Label } from './styles'
import PropTypes from 'prop-types'

export function Textarea({ title, id, gridArea='', ...rest}) {
  return (
    <Label 
      htmlFor={id}
      $gridarea={gridArea}
    >
      <p>{title}</p>
      <Container {...rest} />
    </Label>
  )
}

Textarea.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  gridArea: PropTypes.string
}