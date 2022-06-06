import { FC } from "react";
import styled from 'styled-components'

interface IParagraph {
    text: string;
}

export const Paragraph: FC<IParagraph> = ({ text }) => <SParagraph>{ text }</SParagraph>

const SParagraph = styled.p`
  margin: 3px 10px;
  min-width: 18px;
`;