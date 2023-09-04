import { Container } from './styles'
import { NumberFormatBase, NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types'

function BRLNumberFormat(props) {
  const format = (numStr) => {
    if (numStr === '') return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0,
    }).format(numStr);
  }

  return <NumberFormatBase {...props} format={format} />;
}

function CurrencyInput({ value, onChange }) {
  return (
    <NumericFormat
      value={value}
      onValueChange={({ floatValue }) => onChange(floatValue)}
      thousandSeparator="."
      decimalSeparator=","
      decimalScale={2}
      prefix="R$ "
      isNumericString
      customInput={InputText} // Substitua InputText com o nome do seu componente de input
      format={val => (val ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val) : "")}
    />
  );
}

export function MoneyInput({ icon: Icon, isOnLogin=false, title, id, gridArea='', isDate=false, ...rest }) {
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
        <BRLNumberFormat id={id} {...rest} onValueChange={(values, sourceInfo) => console.log(values)} />
      </div>
    </Container>
  )
}

MoneyInput.propTypes = {
  icon: PropTypes.elementType,
  isOnLogin: PropTypes.bool,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  gridArea: PropTypes.string,
  isDate: PropTypes.bool
}