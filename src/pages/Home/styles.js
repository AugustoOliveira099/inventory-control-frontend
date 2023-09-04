import styled from 'styled-components'

export const Container = styled.div`
  min-height: 100vh;
  overflow-x: hidden;

  display: grid;
  grid-template-rows: 10.5rem auto 9rem;
  // grid-template-columns: 37rem auto;
  // grid-template-areas:
  //   'header header'
  //   'search income'
  //   'search content'
  //   'footer footer';

  grid-template-areas:
  'header'
  'main'
  'footer';

  > main {
    grid-area: main;

    display: grid;
    grid-template-rows: 10rem auto;
    grid-template-columns: 37rem auto;
    grid-template-areas:
    'search income'
    'search content';
  }
`

export const Income = styled.div`
  grid-area: income;

  width: 100%;
  height: 10rem;
  padding-right: 7rem;

  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  > .details-income {
    width: 100%;
    height: fit-content;

    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 1rem;

    p {
      font-weight: bold;

      padding: 0.7rem 1.2rem;
      border-radius: 1rem;
    }

    p.earned-value {
      font-size: 3rem;
      padding: 1rem 1.8rem;

      background-color: ${({ $isminus, theme }) => $isminus ? theme.COLORS.RED_600 : theme.COLORS.GREEN_700};
    }

    p.amount-bought {
      background-color: ${({ theme }) => theme.COLORS.RED_600};
    }

    .equation {
      display: flex;
      align-items: flex-end;
      gap: 1rem;
      margin-bottom: 1rem;

      .amount-sold p {
        background-color: ${({ theme }) => theme.COLORS.GREEN_700};
      }

      .amount-bought p {
        background-color: ${({ theme }) => theme.COLORS.RED_600};
      }

      svg {
        margin-bottom: 0.8rem;
      }
    }
  }

  .failed-details-income {
    text-align: right;
    font-style: italic;

    margin-bottom: 1rem;
  }

  span {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
  }
`

export const Search = styled.div`
  grid-area: search;

  padding: 3rem 1rem 3rem 1rem;
  margin-left: 4rem;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  > strong {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  > .sold-checkbox,
  > .bought-checkbox {
    input {
      margin-right: 1rem;
    }

    input:focus-visible {
      outline: 1px solid rgb(125, 173, 217);
    }

    label,
    input {
      cursor: pointer;
    }
  }

  > .bought-checkbox {
    margin-bottom: 1rem;
  }

  > .bought-price,
  > .sold-price {
    p {
      margin-bottom: 0.7rem;
      font-weight: 500;
    }

    .inputs {
      display: flex;
      gap: 1rem;
    }
  }

  > .define-dates {
    display: flex;
    align-items: center;
    gap: 1rem;

    span {
      font-size: 1.4rem;
    }

    div:first-child {
      margin-bottom: 0;
    }
  }

  > .filter-buttons {
    display: flex;
    gap: 1.5rem;
  }
`

export const Content = styled.div`
  grid-area: content;

  padding: 0 7rem 2rem 4rem;
  width: 100%;

  > .filter-date {
    margin-bottom: 3rem;

    h2 {
      font-size: 2.8rem;
      color: ${({ theme }) => theme.COLORS.WHITE_300}
    }
    
    span {
      color: ${({ theme }) => theme.COLORS.GRAY_100}
    }
  }

  > .products-content {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1.5rem;

    .warning {
      white-space: nowrap;
      font-style: italic;
    }
  }

  > .more-products {
    display: flex;
    justify-content: center;
    margin-top: 3rem;

    button {
      width: 18rem;
    }
  }
`