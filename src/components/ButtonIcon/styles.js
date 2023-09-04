import styled from 'styled-components'

export const Container = styled.button`
  grid-area: button;
  
  display: flex;
  align-items: center;

  gap: 1rem;
  margin-top: 2rem;

  background-color: ${({ $isorange, theme }) => $isorange ? theme.COLORS.ORANGE : theme.COLORS.RED_700};
  color: ${({ $isorange, theme }) => $isorange ? theme.COLORS.BACKGROUND_900 : theme.COLORS.WHITE_300};

  width: fit-content;
  height: 5.6rem;
  border: 0;
  padding: 0 1.6rem;
  padding: 1.5rem 1.6rem;
  border-radius: 1rem;
  font-weight: 500;

  &:disabled {
    opacity: 0.5;
  }

  > svg {
    font-size: 2rem;
    color: ${({ $isorange, theme }) => $isorange ? theme.COLORS.BACKGROUND_900 : theme.COLORS.RED_500};
  }
`