import { Container, Box } from './styles'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

export function ProductItem({ product, ...rest }) {
  const navigate = useNavigate()
  const [titleSold, setTitleSold] = useState('')
  const [isProductSold, setIsProductSold] = useState(false)

  const [newBoughtDate,] = product.bought_at.split(' ')
  const [yearBought, mounthBought, dayBought] = newBoughtDate.split('-')
  const boughtDateFormated = `${dayBought}/${mounthBought}/${yearBought}`
  
  let soldDateFormated
  if (product.sold_at) {
    const [newSoldDate,] = product.sold_at.split(' ')
    const [yearSold, mounthSold, daySold] = newSoldDate.split('-')
    soldDateFormated = `${daySold}/${mounthSold}/${yearSold}`
  }

  function handleFormatNumber(number) {
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function handleShowProduct(id) {
    navigate(`/product/${id}`)
  }

  function isSold() {
    if (product.sold_at && product.value_sold ) {
      setTitleSold('Vendido:')
      return true
    } else if (product.sold_at && !product.value_sold) {
      setTitleSold('Vendido em:')
      return true
    } else if (!product.sold_at && product.value_sold) {
      setTitleSold('Vendido por:')
      return true
    }

    return false
  }

  product.value_bought = handleFormatNumber(product.value_bought)
  if (product.value_sold) {
    product.value_sold = handleFormatNumber(product.value_sold)
  }

  useEffect(() => {
    setIsProductSold(isSold())
  }, [])

  return (
    <Container 
      onClick={() => handleShowProduct(product.id)}
      {...rest} 
    >
      <Box 
        className="box"
        $isproductsold={isProductSold}
      >
        <h3>{product.title}</h3>
        <div className="content">
          <section className="bought">
            <p className="title">Comprado:</p>
            <p className="date">{boughtDateFormated}</p>
            <span>{product.value_bought}</span>
          </section>

          <section className="sold">
            { isProductSold &&
              <p className="title">{titleSold}</p>
            }
            { 
              product.sold_at &&
              <p className="date">{soldDateFormated}</p>
            }
            {
              product.value_sold &&
              <span>{product.value_sold}</span>
            }
          </section>
        </div>
      </Box>
    </Container>
  )
}

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
}