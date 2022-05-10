import { FC } from "react";
import styled from 'styled-components'

interface ILoader {
    text: string;
}

export const Loader: FC<ILoader> = ({ text }) => <SLoader>{text}</SLoader>

const SLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: 1px solid #e9eeff;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 16%);
  border-radius: 8px;
`;