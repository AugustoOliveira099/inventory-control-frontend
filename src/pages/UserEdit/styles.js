import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;

  display: grid;
  grid-template-rows: 10.5rem auto 9rem;
  grid-template-areas: 
    'header'
    'content'
    'footer';

  > .register {
    width: fit-content;
    grid-area: content;

    margin: 5rem auto;

    display: flex;
    flex-direction: column;

    justify-content: center;
  }
`

export const Form = styled.form`
  padding: 3rem 5rem 4rem 5rem;
  margin-top: 2rem;

  width: 40rem;
  height: fit-content;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  border-radius: 1.6rem;

  > h2 {
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 4rem;
  }

  > div {
    p {
      margin-top: 0.7rem;
    }
  }

  > .container-checkbox {
    width: 100%;
    margin-block: 2rem;
    display: flex;

    align-items: center;
    gap: 1rem;
  }

  > .buttons {
    width: 100%;
    display: flex;
    gap: 1.5rem;
  }
`