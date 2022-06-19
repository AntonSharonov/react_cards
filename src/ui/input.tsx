import { ChangeEventHandler, forwardRef } from "react";
import styled from 'styled-components'

interface IInput {
    onChange: ChangeEventHandler;
    value: string;
    placeholder: string;
    isDisable?: boolean;
    icon?: JSX.Element;
    iconOnClick?: () => void;
}

export const Input = forwardRef<HTMLInputElement, IInput>(({
                                                               onChange,
                                                               value,
                                                               placeholder,
                                                               isDisable,
                                                               icon,
                                                               iconOnClick
                                                           }, ref) =>
    <SWrapper data-disable={ isDisable }>
        <SInput value={ value } ref={ ref } onChange={ onChange } placeholder={ placeholder } disabled={ isDisable }/>
        <SIconWrapper onClick={ iconOnClick }>{ icon }</SIconWrapper>
    </SWrapper>
)

const SInput = styled.input.attrs({ type: "text" })`
  outline: none;
  border: none;
  width: 100%;
  margin-right: 10px;
  margin-bottom: 1px;

  background-color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

  &[disabled] {
    cursor: not-allowed;

    &::placeholder {
      color: #bfbfbf;
    }
  }
`;

const SWrapper = styled.div`
  display: flex;
  height: 38px;
  width: 300px;
  flex-direction: row;
  align-items: center;
  border: 1px solid #e0e0e0;
  margin: 10px;
  border-radius: 10px;
  padding: 0 20px;

  &[data-disable='true'] {
    cursor: not-allowed;
  }
`;

const SIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;