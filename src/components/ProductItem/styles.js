import styled from 'styled-components'

export const Container = styled.button`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
  
  border-radius: 1rem;
  border: none;

  width: 100%;
  height: 100%;

  padding: 2.2rem;

  &:hover, &:focus {
    filter: brightness(0.9);
  }
`

export const Box = styled.div`
  height: 100%;
  
  > h3 {
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.COLORS.ORANGE}
  }

  > .content {
    display: flex;
    justify-content: ${({ $isproductsold }) => $isproductsold ? "space-between" : "center"};

    .title {
      font-weight: bold;
      margin-bottom: 0.8rem;
    }

    .date {
      margin-bottom: 0.5rem;
    }

    p, span {
      color: ${({ theme }) => theme.COLORS.WHITE_300};
    }

    span {
      font-weight: bold;
      padding: 0.3rem 0.5rem;
      border-radius: 0.5rem;
    }

    .bought {
      text-align: ${({ $isproductsold }) => $isproductsold ? "left" : "center"};

      span {
        background-color: ${({ theme }) => theme.COLORS.RED_600};
      }
    }

    .sold {
      text-align: ${({ $isproductsold }) => $isproductsold ? "right" : "center"};
      
      span {
        background-color: ${({ theme }) => theme.COLORS.GREEN_700};
      }
    }

  }

  
`