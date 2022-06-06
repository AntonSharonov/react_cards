import { ChangeEventHandler, FC } from "react";
import styled from 'styled-components'

interface ICheckbox {
    isChecked: boolean;
    onChange: ChangeEventHandler;
}

export const Checkbox: FC<ICheckbox> = ({ isChecked, onChange }) => (
    <SCheckbox checked={ isChecked } onChange={ onChange }/>
)

const SCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin: 2px;
  cursor: pointer;
`;