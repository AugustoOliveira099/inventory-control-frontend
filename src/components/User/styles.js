import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled(Link)`
  display: grid;
  grid-template-columns: 15rem 30rem 15rem 10rem 10rem;
  border-collapse: separate; 
  padding: 2rem 0;

  border-radius: ${({ $islast }) => $islast ? '0 0 1rem 1rem' : 'none'};
  background-color: ${({ $isodd, theme }) => $isodd ? theme.COLORS.ORANGE_500 : theme.COLORS.WHITE_300};

  > span {
    color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  }

  > .close {
    fill: ${({ $isodd, theme }) => $isodd ? theme.COLORS.RED_600 : theme.COLORS.RED_600};
    // background-color: ${({ theme }) => theme.COLORS.RED_600};
  }

  > .check {
    fill: ${({ theme }) => theme.COLORS.GREEN_700};
  }

  > span,
  > svg {
    display: flex;
    justify-self: center;
  }
`