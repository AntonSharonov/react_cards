import { FC } from "react";
import styled from 'styled-components'
import { Button } from "../button";
import { $isFiltered, onFilterChanged } from "../../shared/productCards/model";
import { useStore } from "effector-react";

export const Header: FC = () => {
    const isFiltered = useStore($isFiltered);

    return (
        <SHeader>
            <SRow>
                <Button onClick={() => onFilterChanged()} isActive={isFiltered} text='FILTER: by likes'/>
            </SRow>
        </SHeader>
    )
}

const SHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 70%;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 16%);
  border-radius: 8px;
  margin-top: 30px;
`;