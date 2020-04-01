import styled from 'styled-components'

const OutlineButton = styled.button`
  ${props => `
    border-color: red;
    border-radius: 20px;
    border-width: 2px;
    color: blue;
    font-size: 1.2rem;
    padding: 10px 40px;

    &:hover {
      background-color: blue;
      color: white;
    }
  `
}
`

export default OutlineButton
