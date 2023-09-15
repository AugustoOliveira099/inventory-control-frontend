import { useRef, useState } from "react"
import { useAuth } from '../../hooks/auth';
import { useNavigate } from "react-router-dom";

import { AiFillPlusCircle, AiTwotoneCalendar } from "react-icons/ai";
import { MdTitle } from "react-icons/md";
import { MdOutlineNumbers } from "react-icons/md";
import { BsPersonBadge } from "react-icons/bs";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { GiPayMoney } from "react-icons/gi";
import { FaApple } from 'react-icons/fa'
import { IoColorPalette } from "react-icons/io5";

import { Header } from '../../components/Header'
import { Textarea } from '../../components/Textarea'
import { ButtonIcon } from '../../components/ButtonIcon'
import { InputText } from '../../components/InputText'
import { Back } from "../../components/Back"
import { ModalAlert } from '../../components/ModalAlert'
import { Footer } from '../../components/Footer'

import { api } from '../../services/api'

import { Container, Form } from "./styles"

import { NumericFormat, PatternFormat } from "react-number-format";


export function New() {
  const formattedBoughtAt = useRef('')
  const formattedSoldAt = useRef('')
  const { signOut } = useAuth()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [supplier, setSupplier] = useState('')
  const [client, setClient] = useState('')
  const [color, setColor] = useState('')
  const [model, setModel] = useState('')
  const [serialNumber, setSerialNumber] = useState('')
  const [valueSold, setValueSold] = useState('')
  const [valueBought, setValueBought] = useState('')
  const [soldAt, setSoldAt] = useState('')
  const [boughtAt, setBoughtAt] = useState('')

  const [alertMsg, setAlertMsg] = useState('')
  const [back, setBack] = useState(false)

  const [loading, setLoading] = useState(false)


  const handleValueChangeBought = (values) => {
    const { floatValue } = values;
    setValueBought(floatValue);
  };

  const handleValueChangeSold = (values) => {
    const { floatValue } = values;
    setValueSold(floatValue);
  };

  function checkDates(startDate, endDate) {
    if (startDate) {
      if (startDate.slice(-2) === '00' || startDate.slice(-2) > '31' ||
          startDate.slice(5, 7) === '00' || startDate.slice(5, 7) > '12') {
        setLoading(false)
        setAlertMsg('Insira uma data válida.')
        return false
      }
    } else {
      setLoading(false)
      setAlertMsg('Insira uma data de compra.')
      return false
    }

    if (endDate) {
      if (endDate.slice(-2) === '00' || endDate.slice(-2) > '31' ||
          endDate.slice(5, 7) === '00' || endDate.slice(5, 7) > '12') {
        setLoading(false)
        setAlertMsg('Insira uma data válida.')
        return false
      }
  
      if(startDate > endDate) {
        setLoading(false)
        setAlertMsg('A data no campo "De:" deve ser menor ou igual que a data no campo "Até:".')
        return false
      }
    }

    return true
  }

  async function handleAddProduct() {
    setLoading(true)

    if (title === '' || 
    supplier === '' || 
    valueBought === '' || 
    formattedBoughtAt.current === '') {
      setLoading(false)
      return setAlertMsg('Os campos marcados com asterisco (*) são obrigatórios.')
    }

    const dateOk = checkDates(formattedBoughtAt.current, formattedSoldAt.current)

    if (!dateOk) {
      return
    }

    try {
      await api.post('/products', {
        title,
        details,
        supplier,
        client,
        value_bought: valueBought,
        value_sold: valueSold,
        bought_at: formattedBoughtAt.current,
        sold_at: formattedSoldAt.current,
        color,
        model,
        serial_number: serialNumber
      })

      setAlertMsg('Produto criado com sucesso!')
      setBack(true)
    } catch (error) {
      setLoading(false)

      if(error.response) {
        if(error.response.status === 403) {
          navigate('/')
          signOut()
        }
        setAlertMsg(error.response.data.message)
      } else {
        console.error(error)
        setAlertMsg('Ocorreu um erro inesperado :(. Por favor, tente novamente.')
      }
    }

    setLoading(false)
  }

  function handleSetBoughtAt (date) {
    if(!date.includes('_') && date !== '') {
      const [day, mounth, year] = date.split('/')
      formattedBoughtAt.current = `${year}-${mounth}-${day}`
    } else {
      formattedBoughtAt.current = ''
    }
    
    setBoughtAt(date)
  }

  function handleSetSoldAt (date) {
    if(!date.includes('_') && date !== '') {
      const [day, mounth, year] = date.split('/')
      formattedSoldAt.current = `${year}-${mounth}-${day}`
    } else {
      formattedSoldAt.current = ''
    }
    
    setSoldAt(date)
  }
  

  return (
    <Container>
      <Header />

      <main>
        <div className="top">
          <Back />
          <h2>Adicionar produto</h2>
          <p>Os campos marcados com asterisco (*) são obrigatórios.</p>
        </div>

        <Form>
          <InputText 
            title="Título *"
            id="title"
            type="text"
            placeholder="Digite um título para o produto"
            value={title}
            onChange={e => setTitle(e.target.value)}
            gridArea="title"
            icon={MdTitle}
          />

          <InputText 
            title="Modelo"
            id="model"
            type="text"
            placeholder="Modelo do produto"
            value={model}
            onChange={e => setModel(e.target.value)}
            gridArea="model"
            icon={FaApple}
          />

          <InputText 
            title="Cor"
            id="color"
            type="text"
            placeholder="Cor do produto"
            value={color}
            onChange={e => setColor(e.target.value)}
            gridArea="color"
            icon={IoColorPalette}
          />

          <InputText 
            title="Número de série"
            id="serial-number"
            type="text"
            placeholder="Número de série do produto"
            value={serialNumber}
            onChange={e => setSerialNumber(e.target.value)}
            gridArea="serial-number"
            icon={MdOutlineNumbers}
          />

          <InputText 
            title="Fornecedor *"
            id="supplier"
            type="text"
            placeholder="Fornecedor do produto"
            value={supplier}
            onChange={e => setSupplier(e.target.value)}
            gridArea="supplier"
            icon={BsFileEarmarkPersonFill}
          />

          <InputText 
            title="Cliente"
            id="client"
            type="text"
            placeholder="Quem comprou o produto?"
            value={client}
            onChange={e => setClient(e.target.value)}
            gridArea="client"
            icon={BsPersonBadge}
          />

          <NumericFormat
            title="Valor pago *"
            id="value-bought"
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            prefix="R$ "
            placeholder="R$ 0,00"
            value={valueBought}
            onValueChange={handleValueChangeBought}
            customInput={InputText}
            icon={GiPayMoney}
          />

          <NumericFormat
            title="Valor vendido"
            id="value-sold"
            thousandSeparator="."
            decimalSeparator=","
            decimalScale={2}
            fixedDecimalScale
            prefix="R$ "
            placeholder="R$ 0,00"
            value={valueSold}
            onValueChange={handleValueChangeSold}
            customInput={InputText}
            icon={GiReceiveMoney}
          />

          <PatternFormat 
            format="##/##/####"
            mask="_"
            placeholder="dd/mm/aaaa"
            customInput={InputText}
            icon={AiTwotoneCalendar}
            id="bought-at"
            title="Data de compra *"
            value={boughtAt}
            onChange={e => handleSetBoughtAt(e.target.value)}
            gridArea="bought-at"
            width="12rem"
          />

          <PatternFormat 
            format="##/##/####"
            mask="_"
            placeholder="dd/mm/aaaa"
            customInput={InputText}
            icon={AiTwotoneCalendar}
            id="sold-at"
            title="Data venda"
            value={soldAt}
            onChange={e => handleSetSoldAt(e.target.value)}
            gridArea="sold-at"
            width="12rem"
          />

          <Textarea 
            title="Detalhes"
            id="details"
            type="text"
            placeholder="Informe detalhes sobre o produto, caso queira"
            value={details}
            onChange={e => setDetails(e.target.value)}
            gridArea="details"
          />
        </Form>

        <ButtonIcon className="add-product"
          title="Adicionar produto" 
          icon={AiFillPlusCircle}
          loading={loading}
          onClick={handleAddProduct}
        />

        <ModalAlert
          content={alertMsg}
          setContent={setAlertMsg}
          back={back} 
        />
      </main>

      <Footer/>
    </Container>
  )
}