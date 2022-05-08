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
`;