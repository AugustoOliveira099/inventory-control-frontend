import styled from 'styled-components'

export const Container = styled.footer`
  grid-area: footer;

  width: 100%;
  height: 9rem;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 4rem;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
  }
`

export const Logo = styled.div`
  > a {
    display: flex;
    align-items: center;
    gap: 1rem;

    h1 {
      color: ${({ theme }) => theme.COLORS.GRAY_500};
      font-family: 'Roboto', sans-serif;
      font-size: 3rem;
      white-space: nowrap;
    }

    svg {
      color: ${({ theme }) => theme.COLORS.GRAY_500};
      font-size: 3rem;
    }
  }
`

export const Reference = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: flex-end;

  > .instagram {
    display: flex;
    width: fit-content;

    align-items: center;
    gap: 0.5rem;

    color: ${({ theme }) => theme.COLORS.GRAY_100};
    // color: ${({ theme }) => theme.COLORS.WHITE_300};
  }

  > span {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }
`