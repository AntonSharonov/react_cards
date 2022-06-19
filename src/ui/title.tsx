import { FC } from "react";
import styled from 'styled-components'

interface ITitle {
    text: string;
}

export const Title: FC<ITitle> = ({ text }) => <STitle>{ text }</STitle>

const STitle = styled.h2`
  margin: 3px 10px;
  min-width: 30px;

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }

  @media screen and (max-width: 399px) {
    font-size: 14px;
  }

  @media screen and (max-width: 399px) {
    font-size: 14px;
  }

  @media screen and (max-width: 299px) {
    font-size: 12px;
    overflow-wrap: anywhere;
  }
`;