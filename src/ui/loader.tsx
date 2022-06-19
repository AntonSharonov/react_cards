import { FC } from "react";
import styled from 'styled-components'

export const Loader: FC = () => {
    return <SLoader/>
}

const SLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
  width: 36px;
  height: 36px;
  border: 8px solid;
  border-color: #5876EF #5876EF transparent #5876EF;
  border-radius: 50%;
  animation: spin 1.2s linear infinite;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;