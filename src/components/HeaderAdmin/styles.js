import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.header`
  grid-area: header;
  position: fixed;
  z-index: 1000;

  display: flex;
  height: 10.5rem;
  width: 100%;

  border-bottom: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_700};
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: auto 25rem 4rem;
  padding: 2.5rem 4rem;

  width: 100%;
`

export const Logo = styled.div`
  border-right: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_700};
  padding: 3rem 4rem;
  
  > a {
    display: flex;
    align-items: center;
    gap: 1rem;

    h1 {
      color: ${({ theme }) => theme.COLORS.ORANGE};
      font-family: 'Roboto', sans-serif;
      font-size: 3rem;
      white-space: nowrap;
    }

    svg {
      color: ${({ theme }) => theme.COLORS.WHITE_300};
      font-size: 3rem;
    }
  }
`

export const Profile = styled.div`
  > a {
    display: flex;
    align-items: center;
    height: 100%;
    width: fit-content;
  
    img {
      width: 5.6rem;
      height: 5.6rem;
      border-radius: 50%;
    }
  
    div {
      display: flex;
      flex-direction: column;
      margin-left: 1.6rem;
  
      span {
        font-size: 1.4rem;
        color: ${({ theme }) => theme.COLORS.GRAY_100};
      }
  
      strong {
        font-size: 1.8rem;
        color: ${({ theme }) => theme.COLORS.WHITE_300};
      }
    }
  }
`

export const NewUser = styled(Link)`
  border: none;
  border-radius: 1rem;

  background-color: ${({ theme }) => theme.COLORS.ORANGE};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.3rem;

  margin-right: 4rem;
  padding: 0 2rem;
  
  white-space: nowrap;

  > span {
    color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    font-size: 1.8rem;
    font-weight: 500;
  }

  > svg {
    font-size: 2rem;
    
    path,
    circle,
    line {
      color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    }
  }
`

export const Logout = styled.button`
  border: none;
  background: none;
  height: fit-content;
  margin: auto;

  > svg {
    fill: ${({ theme }) => theme.COLORS.GRAY_100};
    font-size: 3rem;
  }
`