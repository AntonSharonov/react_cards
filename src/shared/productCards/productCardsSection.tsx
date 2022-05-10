import { FC, useEffect } from "react";
import { onFetchLoadingStarted } from "./model";
import styled from "styled-components";
import { CardList } from "../../ui/cardList/cardList";
import { Header } from "../../ui/header/header";

export const ProductCardsSection: FC = () => {
    useEffect(() => {
        onFetchLoadingStarted();
    }, [])

    return (
        <SProductCardsSection>
            <Header/>
            <CardList/>
        </SProductCardsSection>
    )
}

const SProductCardsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;