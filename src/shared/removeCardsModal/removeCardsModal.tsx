import { FC } from 'react';

import { useStore } from 'effector-react';
import styled from 'styled-components';
import {
    $selectedCardsIDs,
    $cardsData,
    $isShowCardRemoveModal,
    onCardRemoveModalShowed, onCardRemoved
} from "../productCards/model";
import { Button } from "../../ui/button";

export const RemoveCardsModal: FC = () => {
    const isDisplay = useStore($isShowCardRemoveModal);
    const cards = useStore($cardsData);
    const selectedIDs = useStore($selectedCardsIDs);

    const handleRemove = () => {
        for (let i = cards.length - 1; i >= 0; i--) {
            const id = selectedIDs.find((id) => id === cards[i].id);
            if (id) onCardRemoved(id);
        }
        onCardRemoveModalShowed();
    };

    const handleCancel = () => onCardRemoveModalShowed();

    return (
        <SRemoveCardsModal data-display={ isDisplay }>
            <SHeader>Are you sure you want to remove the selected items?</SHeader>
            <SButtons>
                <Button onClick={ handleCancel } text='Cancel'/>
                <Button onClick={ handleRemove } text='Remove'/>
            </SButtons>
        </SRemoveCardsModal>
    );
};

const SRemoveCardsModal = styled.div`
  display: none;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px;
  width: 320px;
  height: 140px;
  background: #f9eff1;
  box-shadow: 0 2px 8px rgba(8, 11, 48, 0.16);
  border-radius: 8px;

  &[data-display='true'] {
    display: flex;
  }

  @media screen and (max-width: 370px) {
    width: 100%;
    margin: 20px;
  }
`;

const SHeader = styled.p`
  margin: 0 0 12px;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #232633;
`;

const SButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
