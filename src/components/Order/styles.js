import styled from 'styled-components'

export const Container = styled.div`
  margin-block: 1rem;

  > button {
    background-color: ${({ theme }) => theme.COLORS.ORANGE};
    display: flex;
    gap: 0.5rem;
    padding: 0.8rem 1rem;
    border: none;
    border-radius: 0.7rem;

    svg,
    #button-title {
      color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
    }
  }
`

export const Options = styled.div`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  color: ${({ theme }) => theme.COLORS.WHITE_100};
  padding: 1.3rem 2rem 2rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 -2px 12px rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 34.8rem;
  transform: translateY(-17%); 
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: -6.5%;
    left: 20%;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent ${({ theme }) => theme.COLORS.BACKGROUND_900} transparent;
    transform: translateX(-50%);
  }

  > .filter-options {
    margin-top: 0.7rem;

    div {
      display: flex;
      gap: 1rem;

      &:not(:first-child) {
        margin-top: 0.4rem;
      }

      p {
        white-space: nowrap;
      }
    }
  }
`