import PropTypes from 'prop-types'
import { Container, Options } from "./styles"
import { BsArrowDownUp } from 'react-icons/bs'

import { useRef, useEffect, useState } from "react"

export function Order({ handleSetOrder }) {
  const refFilter = useRef(null)
  const refButton = useRef(null)
  const [open, setOpen] = useState(false)
  const [options, setOptions] = useState([
    {
      description: 'Título (A-Z)',
      columnName: 'title',
      columNameRaw: 'updated_at',
      order: 'asc',
      isActive: false
    },
    {
      description: 'Título (Z-A)',
      columnName: 'title',
      columNameRaw: 'updated_at',
      order: 'desc',
      isActive: false
    },
    {
      description: 'Data de compra (01/01 - 31/12)',
      columnName: 'bought_at',
      columNameRaw: 'title',
      order: 'asc',
      isActive: false
    },
    {
      description: 'Data de compra (31/12 - 01/01)',
      columnName: 'bought_at',
      columNameRaw: 'title',
      order: 'desc',
      isActive: false
    },
    {
      description: 'Data de venda (01/01 - 31/12)',
      columnName: 'sold_at',
      columNameRaw: 'title',
      order: 'asc',
      isActive: false
    },
    {
      description: 'Data de venda (31/12 - 01/01)',
      columnName: 'sold_at',
      columNameRaw: 'title',
      order: 'desc',
      isActive: false
    },
    {
      description: 'Data de atualização (01/01 - 31/12)',
      columnName: 'updated_at',
      columNameRaw: 'title',
      order: 'asc',
      isActive: false
    },
    {
      description: 'Data de atualização (31/12 - 01/01)',
      columnName: 'updated_at',
      columNameRaw: 'title',
      order: 'desc',
      isActive: true
    }
  ])

  function handleButtonClick() {
    setOpen(!open)
  }

  function handleToogleIsActive(index) {
    const updatedOptions = [...options]

    for (let i = 0; i <= options.length-1; i++) {
      if (i !== index) {
        updatedOptions[i].isActive = false
      }
    }
    
    updatedOptions[index].isActive = !updatedOptions[index].isActive
    setOptions(updatedOptions)

    if (updatedOptions[index].isActive) {
      handleSetOrder(
        updatedOptions[index].columnName, 
        updatedOptions[index].order, 
        updatedOptions[index].columNameRaw
      )
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (refFilter.current && !refFilter.current.contains(event.target) && !refButton.current.contains(event.target)) {
        setOpen(false)
      }
    }

    // Adiciona o ouvinte de eventos ao documento
    document.addEventListener('mousedown', handleClickOutside);

    // Remove o ouvinte de eventos ao desmontar o componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [])

  return (
    <Container>
      <button 
        onClick={handleButtonClick} 
        ref={refButton}
      >
        <BsArrowDownUp />
        <span id="button-title">Ordenar por</span>
      </button>

      { 
        open &&
        <Options ref={refFilter}>
          <strong>Ordenar por</strong>
          <div className="filter-options">
            { 
              options.length > 0 &&
              options.map((option, index) => (
                <div key={`${index}`}>
                  <input 
                    type="checkbox"
                    checked={option.isActive}
                    onChange={() => handleToogleIsActive(index)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleToogleIsActive(index);
                      }
                    }}
                  />
                  <p>{option.description}</p>
                </div>
              ))
            }
          </div>
        </Options>
      }
    </Container>
  )
}

Order.propTypes = {
  handleSetOrder: PropTypes.func.isRequired
}