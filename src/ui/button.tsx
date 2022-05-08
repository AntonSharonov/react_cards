import { FC, MouseEventHandler } from "react";
import styled from 'styled-components'

interface IButton {
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const Button: FC<IButton> = ({ text, onClick }) => <SButton onClick={onClick}>{text}</SButton>

const SButton = styled.button``;