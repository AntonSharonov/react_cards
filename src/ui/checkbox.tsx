import { ChangeEventHandler, FC } from "react";
import styled from 'styled-components'
import { CheckMarkIcon } from "./icons/checkMarkIcon";

interface ICheckbox {
    isChecked: boolean;
    onChange: ChangeEventHandler;
}

export const Checkbox: FC<ICheckbox> = ({ isChecked, onChange }) => (
    <SCheckbox>
        <SFakeCheckbox data-checked={ isChecked }>{ isChecked && <CheckMarkIcon/> }</SFakeCheckbox>
        <SHiddenCheckbox checked={ isChecked } onChange={ onChange }/>
    </SCheckbox>
)

const SHiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  margin: 2px;
  cursor: pointer;
  opacity: 0;
  position: absolute;
  width: 24px;
  height: 24px;
`;

const SFakeCheckbox = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #adadad;

  &[data-checked='true'] {
    background-color: #5876EF;
    border: 1px solid #5876EF;
  }
`;

const SCheckbox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  margin: 10px;
`;