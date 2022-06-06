import { FC, useEffect } from "react";
import { $isDisplayDeleteModal, onFetchLoadingStarted } from "./model";
import styled from "styled-components";
import { CardList } from "../../ui/cardList/cardList";
import { Header } from "../../ui/header/header";
import { useStore } from "effector-react";
import { DeleteRolesModal } from "../deleteModal";
import { Overlay } from "../../ui/overlay";
import { HeartIcon } from "../../ui/icons/heartIcon";

export const ProductCardsSection: FC = () => {
    const isDisplayDeleteModal = useStore($isDisplayDeleteModal);

    useEffect(() => {
        onFetchLoadingStarted();
    }, [])

    return (
        <SProductCardsSection>
            <Header/>
            <CardList/>
            { isDisplayDeleteModal && (
                <Overlay>
                    <DeleteRolesModal/>
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