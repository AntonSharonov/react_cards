import {FC, ReactNode} from 'react';

import styled from 'styled-components';

interface IOverlay {
    children?: ReactNode;
}

export const Overlay: FC<IOverlay> = ({children}) => {
    return <SOverlay>{children}</SOverlay>;
};

const SOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;
