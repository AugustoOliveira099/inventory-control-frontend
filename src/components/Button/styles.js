import styled from 'styled-components'

export const Container = styled.button`
  width: 100%;
  background-color: ${({ $isred, theme }) => $isred ? theme.COLORS.RED_700 : theme.COLORS.ORANGE};
  color: ${({ $isred, theme }) => $isred ? theme.COLORS.WHITE_300 : theme.COLORS.BACKGROUND_900};

  height: 5.6rem;
  border: 0;
  padding: 0 1.6rem;
  margin-top: 1.6rem;
  border-radius: 1rem;
  font-weight: 500;

  &:disabled {
    opacity: 0.5;
  }
`