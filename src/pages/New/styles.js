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

  > main {
    grid-area: content;

    display: grid;
    grid-template-areas:
      'top'
      'form'
      'button';

    margin: 0 auto;
    padding: 4rem 17rem;

    .top {
      grid-area: top;

      h2 {
        font-family: 'Roboto', sans-serif;
        font-size: 3rem;
        font-weight: 500;
  
        margin-block: 3rem;
      }

      p {
        margin-bottom: 2rem;
      }
    }

    .add-product {
      justify-self: flex-end;
    }
  }
`

export const Form = styled.form`
  grid-area: form;
  display: grid;
  gap: 1.5rem;
  width: 100%;

  // grid-template-columns: repeat(7, 14.28%);

  // grid-template-columns: repeat(4, 14%) repeat(3, 10%);

  grid-template-areas: 
    'title title title model model color color'
    'serial-number serial-number supplier supplier client client client'
    'value-bought value-sold bought-at sold-at none none none'
    'details details details details details details details';
`