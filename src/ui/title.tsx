import { FC } from "react";
import styled from 'styled-components'

interface ITitle {
    text: string;
}

export const Title: FC<ITitle> = ({ text }) => <STitle>{text}</STitle>

const STitle = styled.h2`
  margin: 0;
`;