import styled from 'styled-components'

export const Container = styled.button`
  display: flex;
  gap: 1rem;
  align-items: center;

  border: none;
  background: none;

  > svg,
  > strong {
    color: ${({ theme }) => theme.COLORS.WHITE_300};
  }
`