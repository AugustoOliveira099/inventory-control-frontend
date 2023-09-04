import styled from 'styled-components'

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  z-index: 1000;
`

export const Modal = styled.div`
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 0.2rem 0.8rem rgba(0, 0, 0, 0.2);
  overflow-x: auto;
  width: fit-content;
  max-width: 90%;
  max-height: 80%;
  flex-direction: column;
  padding: 2rem;
  z-index: 1001;

  > .modal-content {
    p {
      margin-bottom: 2rem;
      color: black;
    }
  }

  > footer {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    justify-content: flex-end;

    button {
      width: fit-content;
    }
  }
`