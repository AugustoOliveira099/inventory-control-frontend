import styled from 'styled-components'

export const Container = styled.div`
  grid-area: ${({ $gridarea }) => $gridarea};
  width: 100%;
  
  > label {
    p {
      color: ${({ theme }) => theme.COLORS.WHITE_300};
      margin-bottom: 0.7rem;
      text-align: left;
    }
  }

  > .input {
    width: 100%;
    display: flex;
    align-items: center;

    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    color: ${({ theme }) => theme.COLORS.GRAY_300};

    margin-bottom: 0.8rem;
    border-radius: 1rem;
    border: ${({ theme, $isonlogin }) => $isonlogin ? `1px solid ${theme.COLORS.WHITE_300}` : 'none'};

    input[type="date"] {
      filter: invert(40%);
      &:focus {
        filter: invert(10%);
      }
    }

    input {
      height: 5.6rem;
      // width: 100%;

      padding: 1.2rem;

      color: ${({ $isdate, theme }) => $isdate ? theme.COLORS.GRAY_300 : theme.COLORS.WHITE_300};
      background: transparent;
      border: 0;

      &:focus {
        color: ${({ theme }) => theme.COLORS.WHITE_300};
      }

      &::placeholder {
        color: ${({ theme }) => theme.COLORS.GRAY_300};
      }
    }

    svg {
      margin-left: 1.6rem;
    }
  }
`