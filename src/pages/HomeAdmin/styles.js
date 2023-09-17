import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-rows: 10.5rem auto 9rem;
  grid-template-areas: 
    'header'
    'content'
    'footer';
`

export const Main = styled.main`
  grid-area: content;
  margin: 0 auto;

  > .search {
    width: 30rem;
    margin-top: 4rem;
  }

  > .table-header {
    display: grid;
    grid-template-columns: 15rem 30rem 15rem 10rem 10rem;

    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    padding-block: 1.5rem;
    margin-top: 2rem;

    border-radius: 1rem 1rem 0 0;

    span {
      display: flex;
      justify-self: center;
    }
  }


`