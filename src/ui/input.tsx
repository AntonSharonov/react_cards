import { ChangeEventHandler, forwardRef } from "react";
import styled from 'styled-components'

interface IInput {
    onChange: ChangeEventHandler;
    value: string;
}

export const Input = forwardRef<HTMLInputElement, IInput>(
    ({ onChange, value }, ref) => <SInput value={value} ref={ref} onChange={onChange}/>
)

const SInput = styled.input.attrs({ type: "text" })`
  outline: none;
  margin: 10px;
  padding: 0 20px;
  height: 38px;
  width: 200px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;