// InputElement.jsx
import styled from 'styled-components';
import { theme } from '../theme'; // Import the theme

const InputElement = styled.input`
  width: 320px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.colors.grey[900]};
  background: #fff;
  border: 1px solid ${theme.colors.grey[200]};
  box-shadow: 0px 2px 2px ${theme.colors.grey[50]};

  &:hover {
    border-color: ${theme.colors.blue[400]};
  }

  &:focus {
    border-color: ${theme.colors.blue[400]};
    box-shadow: 0 0 0 3px ${theme.colors.blue[200]};
  }

  /* Firefox */
  &:focus-visible {
    outline: 0;
  }
`;

export default InputElement;
