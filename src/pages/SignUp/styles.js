import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const Form = styled.form`
  padding: 5rem;
  width: 40rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  border-radius: 1.6rem;

  margin-right: 8vw;

  > h2 {
    font-size: 3rem;
    font-weight: 500;
    margin-bottom: 4rem;
  }

  > a {
    margin-top: 3rem;
    color: ${({ theme }) => theme.COLORS.WHITE_300};
  }
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  margin-left: 15vw;
  margin-top: -10vw;
  gap: 1.9rem;

  > h1 {
    font-family: 'Roboto', sans-serif;
    font-size: 5rem;

    color: ${({ theme }) => theme.COLORS.ORANGE};
  }

  > img {
    height: 4.75rem;
    width: 4.94rem;
  }
`