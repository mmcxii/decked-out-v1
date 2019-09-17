import styled from 'styled-components';

const CheckboxInput = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  size: 16px;
  clip: rect(0 0 0 0);
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  margin: 5px;
`;

// const StyledCheckbox = styled.div`
//   display: inline-block;
//   width: 16px;
//   height: 16px;
//   background: ${props => props.checked ? 'salmon' : 'papayawhip'};
//   border-radius: 3px;
//   transition: all 150ms;
// `

// const CheckboxContainer = styled.div`
//   display: inline-block;
//   vertical-align: middle;
// `;

export { CheckboxInput };