import { useState, useEffect, useRef } from 'react'

import { FiSearch } from 'react-icons/fi'
import { MdOutlineNumbers } from "react-icons/md";
import { BsPersonBadge } from "react-icons/bs";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { TbZoomMoney } from "react-icons/tb";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FaMinus, FaEquals } from "react-icons/fa6";

import { api } from '../../services/api'

import { Container, Search, Content, Income } from './styles'

import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Input } from '../../components/Input'
import { InputText } from '../../components/InputText'
import { ProductItem } from '../../components/ProductItem'
import { Button } from '../../components/Button'
import { ModalAlert } from '../../components/ModalAlert'
import { Order } from '../../components/Order'

import { NumericFormat, PatternFormat } from "react-number-format";


export function Home() {
  const [maxValue, setMaxValue] = useState('')
  const [minValue, setMinValue] = useState('')
  const [title, setTitle] = useState('')
  const [supplier, setSupplier] = useState('')
  const [seriaNumber, setSerialNumber] = useState('')
  const [client, setClient] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [isBought, setIsBought] = useState(false)
  const [isSold, setIsSold] = useState(false)
  const [columnName, setColumnName] = useState('updated_at')
  const [columnNameRaw, setColumnNameRaw] = useState('title')
  const [order, setOrder] = useState('desc')
  
  const [callFetch, setCallFetch] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alertMsg, setAlertMsg] = useState('')
  const [count, setCount] = useState(0)
  const [moreProducts, setMoreProducts] = useState(false)
  const [page, setPage] = useState(1)
  const [filerByDate, setFilterByDate] = useState(false)
  const [isCurrentMonth, setIsCurrentMonth] = useState(false)
  const [allProductsMsg, setAllProductsMsg] = useState(true)

  const [amountBought, setAmountBought] = useState('')
  const [amountSold, setAmountSold] = useState('')
  const [earnedValue, setEarnedValue] = useState('')
  const [isMinus, setIsMinus] = useState(false)

  const [products, setProducts] = useState([])

  const limit = 12

  const formattedStartDate = useRef('')
  const formattedEndDate = useRef('')


  const handleChangeMinValue = (values) => {
    const { floatValue } = values;
    setMinValue(floatValue);
  };

  const handleChangeMaxValue = (values) => {
    const { floatValue } = values;
    setMaxValue(floatValue);
  };

  function handleDateMsg() {
    if (!isCurrentMonth && !filerByDate) {
      setAllProductsMsg(true)
    } else {
      setAllProductsMsg(false)
    }
  }

  function handleIsCurrentMonth() {
    setIsCurrentMonth(!isCurrentMonth)

    handleFetchProducts()
  }

  function handleIsBought() {
    setIsSold(false)
    setIsBought(!isBought)

    handleFetchProducts()
  }

  function handleIsSold() {
    setIsBought(false)
    setIsSold(!isSold)

    handleFetchProducts()
  }

  function handleSetOrder(column, order, columnRaw) {
    setColumnName(column)
    setOrder(order)
    setColumnNameRaw(columnRaw)

    handleFetchProducts()
  }

  function handleFetchProducts () {
    setPage(1)
    setCallFetch(!callFetch)
  }

  function checkDates(startDate, endDate) {
    if (startDate && endDate) {
      if (startDate.slice(-2) === '00' || startDate.slice(-2) > '31' ||
        endDate.slice(-2) === '00' || endDate.slice(-2) > '31' ||
        startDate.slice(5, 7) === '00' || startDate.slice(5, 7) > '12' ||
        endDate.slice(5, 7) === '00' || endDate.slice(5, 7) > '12') {
        setLoading(false)
        setIsBought(false)
        setIsSold(false)

        setAlertMsg('Insira uma data válida.')
        return false
      }

      if(startDate > endDate) {
        setLoading(false)
        setIsBought(false)
        setIsSold(false)

        setAlertMsg('A data no campo "De:" deve ser menor ou igual que a data no campo "Até:".')
        return false
      }
    } else if (!startDate && endDate || startDate && !endDate) {
      setLoading(false)
      setAlertMsg('Insira ambas as datas.')
      return false
    }

    return true
  }
  
  async function fetchProducts() {
    setLoading(true)

    if (!checkDates()) {
      return
    }

    try {
      const responseProducts = 
        await api.get(
          `/products?limit=${limit}&page=${page}&title=${title}&details=${title}&supplier=${supplier}&startDate=${formattedStartDate.current}&endDate=${formattedEndDate.current}&isBought=${isBought}&isSold=${isSold}&max_value=${maxValue}&min_value=${minValue}&serial_number=${seriaNumber}&client=${client}&current_month=${isCurrentMonth}&columnName=${columnName}&columnNameRaw=${columnNameRaw}&order=${order}&`
        )

      if (moreProducts) {
        setProducts([...products, ...responseProducts.data])
        setMoreProducts(false)
      } else {
        setProducts(responseProducts.data)
      }

      const responsePrice = await api.get(
        `/prices?title=${title}&details=${title}&supplier=${supplier}&startDate=${formattedStartDate.current}&endDate=${formattedEndDate.current}&isBought=${isBought}&isSold=${isSold}&max_value=${maxValue}&min_value=${minValue}&serial_number=${seriaNumber}&client=${client}&current_month=${isCurrentMonth}`
      )

      const { final_value, value_bought, value_sold} = responsePrice.data.values

      let finalValue = final_value
      if (final_value < 0) {
        setIsMinus(true)
        finalValue = Math.abs(final_value)
      } else {
        setIsMinus(false)
      }

      const formattedValueBought = handleFormatNumber(value_bought)
      const formattedValueSold = handleFormatNumber(value_sold)
      const formattedFinalValue = handleFormatNumber(finalValue)

      setAmountBought(formattedValueBought)
      setAmountSold(formattedValueSold)
      setEarnedValue(formattedFinalValue)

      setCount(responsePrice.data.count)

      setLoading(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })

      if (formattedStartDate.current && formattedEndDate.current) {
        setFilterByDate(true)
      } else {
        setFilterByDate(false)
      }
    } catch (error) {
      if (error.response) {
        setAlertMsg(error.response.data.message)
      } else {
        console.error(error)
      }

      setLoading(false)
      setIsBought(false)
      setIsSold(false)
    }
  }

  function handleFetchMoreProducts() {
    setPage(page + 1)
    setMoreProducts(true)
    setCallFetch(!callFetch)
  }

  function handleCleanFilters() {
    setMaxValue('')
    setMinValue('')
    setTitle('')
    setSupplier('')
    setSerialNumber('')
    setClient('')
    handleSetStartDate('')
    handleSetEndDate('')
    setIsBought(false)
    setIsSold(false)
  }

  function handleSetStartDate(date) {
    if(!date.includes('_') && date !== '') {
      const [day, mounth, year] = date.split('/')
      formattedStartDate.current = `${year}-${mounth}-${day}`
    } else {
      formattedStartDate.current = ''
    }
    
    setStartDate(date)
  }

  function handleSetEndDate(date) {
    if(!date.includes('_') && date !== '') {
      const [day, mounth, year] = date.split('/')
      formattedEndDate.current = `${year}-${mounth}-${day}`
    } else {
      formattedEndDate.current = ''
    }
    
    setEndDate(date)
  }

  function handleFormatNumber(number) {
    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  function handleClean() {
    handleCleanFilters()
    handleFetchProducts()
  }

  useEffect(() => {
    handleDateMsg()
  }, [isCurrentMonth, filerByDate])

  useEffect(() => {
    fetchProducts()
  }, [callFetch])

  useEffect(() => {
    async function fetchIncome() {
      const response = await api.get(
        `/prices?title=${title}&details=${title}&supplier=${supplier}&startDate=${formattedStartDate.current}&endDate=${formattedEndDate.current}&isBought=${isBought}&isSold=${isSold}&max_value=${maxValue}&min_value=${minValue}&serial_number=${seriaNumber}&client=${client}&current_month=${isCurrentMonth}`
      )

      const { final_value, value_bought, value_sold} = response.data.values

      let finalValue = final_value
      if (final_value < 0) {
        setIsMinus(true)
        finalValue = Math.abs(final_value)
      } else {
        setIsMinus(false)
      }

      const formattedValueBought = handleFormatNumber(value_bought)
      const formattedValueSold = handleFormatNumber(value_sold)
      const formattedFinalValue = handleFormatNumber(finalValue)

      setAmountBought(formattedValueBought)
      setAmountSold(formattedValueSold)
      setEarnedValue(formattedFinalValue)

      setCount(response.data.count)
    }

    fetchIncome()
  }, [])

  return (
    <Container className='ok'>
      <Header />

      <main>
        <Income
        $isminus={isMinus}
        >
          { earnedValue !== '' &&
            <div className="details-income">
              <div className="equation">
                <div className="amount-sold">
                  <span>Retorno</span>
                  <p>{amountSold}</p>
                </div>
                <FaMinus />
                <div className="amount-bought">
                  <span>Investimento</span>
                  <p>{amountBought}</p>
                </div>
                <FaEquals />
              </div>
              <div className="result">
                <span>Lucro</span>
                <p className="earned-value">{earnedValue}</p>
              </div>
            </div>
          } 
          {
            earnedValue === '' &&
            <p className="failed-details-income">Nenhum dado de faturamento foi encontrado.</p>
          }
        </Income>
        
        <Search>
          <strong>Filtros</strong>

          <form className="current-month-checkbox">
              <input 
                id="current-month"
                type="checkbox"
                checked={isCurrentMonth}
                onChange={handleIsCurrentMonth}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleIsCurrentMonth();
                  }
                }}
              />
              
              <label htmlFor="current-month">
                Produtos do mês atual
              </label>
          </form>

          <div className="sold-checkbox">
              <input 
                id="sold"
                type="checkbox"
                checked={isSold}
                onChange={handleIsSold}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleIsSold();
                  }
                }}
              />
              
              <label htmlFor="sold">
                Produtos que já foram vendidos
              </label>
          </div>

          <div className="bought-checkbox">
              <input 
                id="bought"
                type="checkbox" 
                checked={isBought}
                onChange={handleIsBought}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleIsBought();
                  }
                }}
              />
              
              <label htmlFor="bought">
                Produtos que não foram vendidos
              </label>
          </div>

          <Input 
            type="text"
            placeholder="Título ou detalhes"
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFetchProducts();
              }
            }}
            icon={FiSearch}
          />

          <Input 
            type="text"
            placeholder="Fornecedor"
            value={supplier}
            onChange={e => setSupplier(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFetchProducts();
              }
            }}
            icon={BsFileEarmarkPersonFill}
          />

          <Input 
            type="text"
            placeholder="Cliente"
            value={client}
            onChange={e => setClient(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFetchProducts();
              }
            }}
            icon={BsPersonBadge}
          />

          <Input 
            type="text"
            placeholder="Número de série"
            value={seriaNumber}
            onChange={e => setSerialNumber(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFetchProducts();
              }
            }}
            icon={MdOutlineNumbers}
          />

          <div className="bought-price">
            <p>Preço:</p>
            <div className="inputs">
              <NumericFormat
                id="value-bought"
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                prefix="R$ "
                placeholder="R$ Min."
                value={minValue}
                onValueChange={handleChangeMinValue}
                customInput={Input}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleFetchProducts();
                  }
                }}
                icon={TbZoomMoney}
              />

              <NumericFormat
                id="value-sold"
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                prefix="R$ "
                placeholder="R$ Máx."
                value={maxValue}
                onValueChange={handleChangeMaxValue}
                customInput={Input}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleFetchProducts();
                  }
                }}
                icon={TbZoomMoney}
              />
            </div>
          </div>

          <div className="define-dates">
            <PatternFormat 
              format="##/##/####"
              mask="_"
              placeholder="dd/mm/aaaa"
              customInput={InputText}
              icon={AiTwotoneCalendar}
              id="start-date"
              title="De:"
              value={startDate}
              onChange={e => handleSetStartDate(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleFetchProducts();
                }
              }}
            />

            <PatternFormat 
              format="##/##/####"
              mask="_"
              placeholder="dd/mm/aaaa"
              customInput={InputText}
              icon={AiTwotoneCalendar}
              id="end-date"
              title="Até:"
              value={endDate}
              onChange={e => handleSetEndDate(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleFetchProducts();
                }
              }}
            />
          </div>

          <div className="filter-buttons">
            <Button
              title="Limpar filtros"
              isRed
              onClick={handleClean}
              loading={loading}
            />
            <Button
              title="Aplicar filtros"
              onClick={handleFetchProducts}
              loading={loading}
            />
          </div>
        </Search>

        <Content>
          <div className="filter-date">
            <h2>Produtos</h2>
            <Order handleSetOrder={handleSetOrder}/>
            {
              filerByDate && 
                <span>Exibindo {products.length} de {count} resultado(s), relacionado(s) ao período de {startDate} a {endDate}</span>
            }
            {
              isCurrentMonth && 
                <span>Exibindo {products.length} de {count} resultado(s), relacionado(s) ao mês atual</span>
            }
            {
              allProductsMsg &&
                <span>Exibindo todos os produtos</span>
            }
          </div>

          <div className="products-content">
            {
              products.length > 0 &&
              products.map(product => (
                <ProductItem 
                  key={String(product.id)}
                  product={product}
                />
              ))
            }
            {
              products.length === 0 &&
              <p className="warning">Nenhum produto foi encontrado no momento.</p>
            }
          </div>
          {
            products.length < count &&
              <div className="more-products">
                <Button
                  title="Ver mais"
                  onClick={handleFetchMoreProducts}
                  loading={loading}
                />
              </div>
          }
          
        </Content>
      </main>

      <Footer />

      <ModalAlert 
        setContent={setAlertMsg} 
        content={alertMsg}
      />
    </Container>
  )
}
