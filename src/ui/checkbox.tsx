import { FC, MouseEventHandler } from "react";
import styled from 'styled-components'

interface ICheckbox {
    isChecked: boolean;
    onClick: MouseEventHandler<HTMLInputElement> | undefined;
}

export const Checkbox: FC<ICheckbox> = ({ isChecked, onClick }) => (
    <SCheckbox data-checked={isChecked} onClick={onClick}/>
)

const SCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin: 2px;
  cursor: pointer;

  &[data-checked='true'] {
    color: red;
  }
`;