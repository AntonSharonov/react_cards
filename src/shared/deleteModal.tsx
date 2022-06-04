import { FC } from 'react';

import { useStore } from 'effector-react';
import styled from 'styled-components';
import {
    $checkedIDs,
    $data,
    $isDisplayDeleteModal,
    onDisplayDeleteModal, onRemoveCard
} from "./productCards/model";
import { Button } from "../ui/button";

export const DeleteRolesModal: FC = () => {
    const isDisplay = useStore($isDisplayDeleteModal);
    const roles = useStore($data);
    const checkedIDs = useStore($checkedIDs);

    const handleDelete = () => {
        for (let i = roles.length - 1; i >= 0; i--) {
            const id = checkedIDs.find((id) => id === roles[i].id);
            if (id) onRemoveCard(id);
        }
        onDisplayDeleteModal();
    };

    return (
        <SDeleteRolesModal data-display={ isDisplay }>
            <SHeader>Are you sure you want to remove the selected items?</SHeader>
            <SButtons>
                <Button onClick={ () => onDisplayDeleteModal() } text='Cancel'/>
                <Button onClick={ handleDelete } text='Remove'/>
            </SButtons>
        </SDeleteRolesModal>
    );
};

const SDeleteRolesModal = styled.div`
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
