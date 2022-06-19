import { FC, useEffect } from "react";
import { $isShowCardCreateModal, $isShowCardRemoveModal, onFetchLoadingStarted } from "./model";
import styled from "styled-components";
import { CardList } from "../cardList/cardList";
import { Header } from "../header/header";
import { useStore } from "effector-react";
import { RemoveCardsModal } from "../removeCardsModal/removeCardsModal";
import { Overlay } from "../../ui/overlay";
import { CreateNewCardModal } from "../createNewCardModal/createNewCardModal";

export const ProductCardsSection: FC = () => {
    const isShowCardRemoveModal = useStore($isShowCardRemoveModal);
    const isShowCardCreateModal = useStore($isShowCardCreateModal);

    useEffect(() => {
        onFetchLoadingStarted();
    }, [])

    return (
        <SProductCardsSection>
            <Header/>
            <CardList/>
            { isShowCardRemoveModal && (
                <Overlay>
                    <RemoveCardsModal/>
                </Overlay>
            ) }
            { isShowCardCreateModal && (
                <Overlay>
                    <CreateNewCardModal/>
                </Overlay>
            ) }
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