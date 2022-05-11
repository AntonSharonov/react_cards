import { createRef, FC } from "react";
import styled from 'styled-components'
import { Button } from "../button";
import {
    $inputSearch,
    $isFiltered,
    onFilterChanged,
    onInputSearched,
    onSearchReset
} from "../../shared/productCards/model";
import { useStore } from "effector-react";
import { Input } from "../input";
import { Paragraph } from "../paragraph";
import { Title } from "../title";
import { SEARCH_SPACE } from "../../assets/const";

export const Header: FC = () => {
    const isFiltered = useStore($isFiltered);
    const inputRef = createRef<HTMLInputElement>();
    const searchValues = useStore($inputSearch);

    return (
        <SHeader>
            <SRow>
                <Title text='0'/>
                <Paragraph text='items selected'/>
                <Button isDisable={true} onClick={() => onSearchReset()} text='Select all'/>
                <Button isDisable={true} onClick={() => onSearchReset()} text='Like selected'/>
                <Button isDisable={true} onClick={() => onSearchReset()} text='Remove selected'/>
                <Input value={searchValues.join(SEARCH_SPACE)}
                       onChange={() => onInputSearched(inputRef.current?.value || '')}
                       ref={inputRef}/>
                <Button onClick={() => onSearchReset()} text='Clear search bar'/>
                <Button onClick={() => onFilterChanged()} isActive={isFiltered} text='FILTER: by likes'/>
                <Button isDisable={true} onClick={() => onSearchReset()} text='Reset to default'/>
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
  height: 100px;
  width: 70%;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 16%);
  border-radius: 8px;
  margin-top: 30px;
`;