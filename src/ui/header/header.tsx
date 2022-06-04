import { createRef, FC, useEffect, useState } from "react";
import styled from 'styled-components'
import { Button } from "../button";
import {
    $checkedIDs, $data,
    $inputSearch,
    $isFiltered, $likedIDs, addLikedRoles, onDisplayDeleteModal,
    onFilterChanged,
    onInputSearched, onRemoveCard,
    onSearchReset, removeLikedRoles, resetCheckedRoles, updateCheckedRoles, updateLikedRoles
} from "../../shared/productCards/model";
import { useStore } from "effector-react";
import { Input } from "../input";
import { Paragraph } from "../paragraph";
import { Title } from "../title";
import { SEARCH_SPACE } from "../../assets/const";
import { HeartIcon } from "../icons/heartIcon";
import { TrashIcon } from "../icons/trashIcon";
import { BrokenHeartIcon } from "../icons/brokenHeartIcon";

export const Header: FC = () => {
    const isFiltered = useStore($isFiltered);
    const inputRef = createRef<HTMLInputElement>();
    const searchValues = useStore($inputSearch);
    const checkedIDs = useStore($checkedIDs);
    const likedIDs = useStore($likedIDs);

    const roles = useStore($data);
    const [checked, toggleChecked] = useState(false);

    useEffect(() => {
        toggleChecked(Boolean(roles.length) && checkedIDs.length === roles.length);
    }, [checkedIDs.length, roles.length]);

    const handleCheck = () => {
        resetCheckedRoles();
        if (!checked) {
            roles.forEach((role) => {
                updateCheckedRoles(role.id);
            });
        }
    };

    const handleLikeSet = () => {
        for (let i = roles.length - 1; i >= 0; i--) {
            const checkedID = checkedIDs.find((id) => id === roles[i].id);
            const likedID = likedIDs.find((id) => id === roles[i].id);

            if (checkedID && checkedID !== likedID) addLikedRoles(checkedID);
        }
    };

    const handleLikeRemove = () => {
        for (let i = roles.length - 1; i >= 0; i--) {
            const checkedID = checkedIDs.find((id) => id === roles[i].id);
            const likedID = likedIDs.find((id) => id === roles[i].id);

            if (checkedID && likedID) removeLikedRoles(checkedID);
        }
    };

    const handleRemove = () => {
        if (checkedIDs.length) onDisplayDeleteModal();
    }


    const contains = (where: number[], what: number[]) => {
        for (let i = 0; i < what.length; i++) {
            if (where.indexOf(what[i]) === -1) return false;
        }
        return true;
    }

    const intersection = Boolean(checkedIDs.length && likedIDs.length && checkedIDs.filter(x => likedIDs.includes(x)).length);

    return (
        <SHeader>
            <SRow>
                <SItemsWrapper>
                    <SItems>
                        <Paragraph text={ checkedIDs.length.toString() }/>
                        <Paragraph text='items selected'/>
                    </SItems>
                    <SItems>
                        <Paragraph text={ likedIDs.length.toString() }/>
                        <Paragraph text='items liked'/>
                    </SItems>

                </SItemsWrapper>
                <Button isDisable={ !Boolean(roles.length) } onClick={ handleCheck } isActive={ checked }
                        text={ !checked ? 'Select all' : 'Deselect all' }/>
                <Button isDisable={ true } onClick={ () => onSearchReset() } text='Add new card'/>
                <Input placeholder='Search in cards...' value={ searchValues.join(SEARCH_SPACE) }
                       onChange={ () => onInputSearched(inputRef.current?.value || '') }
                       ref={ inputRef }/>
                <Button onClick={ () => onSearchReset() } isDisable={ !Boolean(searchValues.join()) }
                        text='Clear search bar'/>
                <Button onClick={ () => onFilterChanged() } isActive={ isFiltered } text='FILTER: by likes'/>
                <SIconsWrapper>
                    <SIconWrapper
                        data-active={ !contains(likedIDs, checkedIDs) }
                        onClick={ handleLikeSet }>
                        <HeartIcon width='26px' height='26px'
                                   fill={ !contains(likedIDs, checkedIDs) ? '#fb3958' : '#eaeaea' }/>
                    </SIconWrapper>
                    <SIconWrapper data-active={ intersection }
                                  onClick={ handleLikeRemove }>
                        <BrokenHeartIcon width='26px' height='26px'
                                         fill={ intersection ? '#adadad' : '#eaeaea' }/>
                    </SIconWrapper>
                    <SIconWrapper data-active={ Boolean(checkedIDs.length) } onClick={ handleRemove }>
                        <TrashIcon width='26px' height='26px'
                                   fill={ Boolean(checkedIDs.length) ? '#fb3958' : '#eaeaea' }/>
                    </SIconWrapper>
                </SIconsWrapper>
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
  justify-content: space-evenly;
  align-items: center;
  height: 100px;
  width: 70%;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 16%);
  border-radius: 8px;
  margin-top: 30px;
`;

const SItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const SItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: not-allowed;
  margin: 10px;

  &[data-active='true'] {
    cursor: pointer;
  }
`;

const SIconsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 38px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  margin: 10px;
`;