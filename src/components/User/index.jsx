import { useEffect, useRef, useState } from "react"
import PropTypes from 'prop-types'

import { Container } from "./styles"

import { AiFillCloseCircle, AiFillCheckCircle } from "react-icons/ai"

export function User({ user, index, isLast=false }) {
  const link = useRef(`/user/${user.id}`)
  const [date, setDate] = useState('')
  const [isOdd, setIsOdd] = useState(false)

  useEffect(() => {
    const [year, mounth, day] = user.paid_at.split(' ')[0].split('-')
    const NewMounth = parseInt(mounth) + 1
    
    if (NewMounth < 10) {
      setDate(`${day}/0${NewMounth}/${year}`)
    } else {
      setDate(`${day}/${NewMounth}/${year}`)
    }

    setIsOdd(index%2 === 1)
  }, [index])

  return (
    <Container
      to={link.current}
      $isodd={isOdd}
      $islast={isLast}
    >
      <span>{user.name}</span>
      <span>{user.email}</span>

      {
        user.is_admin === 1 &&
        <span>x</span>
      }
      {
        user.is_admin === 0 &&
        <span>{date}</span>
      }

      {
        user.is_active === 1 &&
        <AiFillCheckCircle className="check" />
      }
      {
        user.is_active === 0 &&
        <AiFillCloseCircle className="close" />
      }

      {
        user.is_admin === 1 &&
        <AiFillCheckCircle className="check" />
      }
      {
        user.is_admin === 0 &&
        <AiFillCloseCircle className="close" />
      }
    </Container>
  )
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  index: PropTypes.bool.isRequired,
  isLast: PropTypes.bool
}