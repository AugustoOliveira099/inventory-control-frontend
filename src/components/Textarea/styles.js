import styled from 'styled-components'

export const Label = styled.label`
  grid-area: ${({ $gridarea }) => $gridarea};

  > p {
    margin-bottom: 0.7rem;
  }
`

export const Container = styled.textarea`
  width: 100%;
  height: 15rem;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  color: ${({ theme }) => theme.COLORS.WHITE_300};

  border: none;
  resize: none;

  border-radius: 1rem;
  padding: 1.6rem;

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.GRAY_300};
  }
`