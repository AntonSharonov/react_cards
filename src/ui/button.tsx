import { FC, MouseEventHandler } from "react";
import styled from 'styled-components'

interface IButton {
    text: string;
    onClick?: MouseEventHandler;
    isActive?: boolean;
    isDisable?: boolean;
}

export const Button: FC<IButton> = ({ text, onClick, isActive, isDisable }) => (
    <SButton data-active={ isActive } disabled={ isDisable } onClick={ onClick }>{ text }</SButton>
)

const SButton = styled.button`
  cursor: pointer;
  color: #232633;
  margin: 5px;
  padding: 0 20px 1px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  user-select: none;
  min-width: 110px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

  &:hover, &[data-active='true']:hover {
    background-color: #f6f6f6;
  }

  &[data-active='true'] {
    background-color: #e0e0e0;
  }

  &[disabled], &[disabled]:hover {
    cursor: not-allowed;
    background-color: #fff;
  }
`;