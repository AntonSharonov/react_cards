import { createRef, FC, useEffect, useState } from "react";
import styled from 'styled-components'
import { Button } from "../button";
import {
    $checkedIDs, $data,
    $inputSearch,
    $isFiltered, $isMenuOpen,
    $likedIDs,
    addLikedRoles,
    onDisplayCreateCardModal,
    onDisplayDeleteModal,
    onFilterChanged,
    onInputSearched, onMenuClose,
    onSearchReset,
    removeLikedRoles,
    resetCheckedRoles,
    updateCheckedRoles
} from "../../shared/productCards/model";
import { useStore } from "effector-react";
import { Input } from "../input";
import { Paragraph } from "../paragraph";
import { SEARCH_SPACE } from "../../assets/const";
import { HeartIcon } from "../icons/heartIcon";
import { TrashIcon } from "../icons/trashIcon";
import { BrokenHeartIcon } from "../icons/brokenHeartIcon";
import { CrossIcon } from "../icons/crossIcon";
import { ArrowDownIcon } from "../icons/arrowDownIcon";
import { ArrowUpIcon } from "../icons/arrowUpIcon";

export const Header: FC = () => {
    const isFiltered = useStore($isFiltered);
    const inputRefMobile = createRef<HTMLInputElement>();
    const inputRef = createRef<HTMLInputElement>();
    const searchValues = useStore($inputSearch);
    const checkedIDs = useStore($checkedIDs);
    const likedIDs = useStore($likedIDs);
    const isMenuOpen = useStore($isMenuOpen);

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

    const handleInputSearchChangeMobile = () => onInputSearched(inputRefMobile.current?.value || '');
    const handleInputSearchChange = () => onInputSearched(inputRef.current?.value || '');

    const handleInputSearchReset = () => onSearchReset();

    const handleCreateNewCard = () => onDisplayCreateCardModal();

    const handleFilterChanged = () => onFilterChanged();

    const handleMenuClose = () => onMenuClose();

    const contains = (where: number[], what: number[]) => {
        for (let i = 0; i < what.length; i++) {
            if (where.indexOf(what[i]) === -1) return false;
        }
        return true;
    }

    const intersection = Boolean(checkedIDs.length && likedIDs.length && checkedIDs.filter(x => likedIDs.includes(x)).length);

    return (
        <SHeader>
            { isMenuOpen && <SRow>
                <SItemsWrapper>
                    <SItems>
                        <Paragraph text={ roles.length.toString() }/>
                        <Paragraph text='total'/>
                    </SItems>
                    <SItems>
                        <Paragraph text={ checkedIDs.length.toString() }/>
                        <Paragraph text='selected'/>
                    </SItems>
                    <SItems>
                        <Paragraph text={ likedIDs.length.toString() }/>
                        <Paragraph text='liked'/>
                    </SItems>
                </SItemsWrapper>
                <SButtonsWrapper>
                    <Button isDisable={ !roles.length }
                            onClick={ handleCheck }
                            isActive={ checked }
                            text={ !checked ? 'Select all' : 'Deselect all' }
                    />
                    <Button onClick={ handleCreateNewCard }
                            text='Create a new card'
                    />
                </SButtonsWrapper>
                <SSearchInputWrapper>
                    <Input isDisable={ !roles.length }
                           placeholder='Search in cards...'
                           value={ searchValues.join(SEARCH_SPACE) }
                           onChange={ handleInputSearchChange }
                           ref={ inputRef }
                           iconOnClick={ handleInputSearchReset }
                           icon={ <CrossIcon
                               width={ '16px' }
                               height={ '16px' }
                               fill={ searchValues.join() ? '#000000' : '#bfbfbf' }/>
                           }/>
                </SSearchInputWrapper>
                <SButtonsWrapper>
                    <Button onClick={ handleFilterChanged }
                            isDisable={ !roles.length }
                            isActive={ isFiltered }
                            text='FILTER: by liked'
                    />
                    <SIconsWrapper>
                        <SIconWrapper
                            data-active={ !contains(likedIDs, checkedIDs) }
                            onClick={ handleLikeSet }>
                            <HeartIcon width='26px'
                                       height='26px'
                                       fill={ !contains(likedIDs, checkedIDs) ? '#fb3958' : '#eaeaea' }
                            />
                        </SIconWrapper>
                        <SIconWrapper
                            data-active={ intersection }
                            onClick={ handleLikeRemove }>
                            <BrokenHeartIcon
                                width='26px'
                                height='26px'
                                fill={ intersection ? '#adadad' : '#eaeaea' }
                            />
                        </SIconWrapper>
                        <SIconWrapper
                            data-active={ Boolean(checkedIDs.length) }
                            onClick={ handleRemove }>
                            <TrashIcon
                                width='26px'
                                height='26px'
                                fill={ Boolean(checkedIDs.length) ? '#fb3958' : '#eaeaea' }
                            />
                        </SIconWrapper>
                    </SIconsWrapper>
                </SButtonsWrapper>
            </SRow> }
            { isMenuOpen && <SMobileSearchInputWrapper>
                <Input isDisable={ !roles.length }
                       placeholder='Search in cards...'
                       value={ searchValues.join(SEARCH_SPACE) }
                       onChange={ handleInputSearchChangeMobile }
                       ref={ inputRefMobile }
                       iconOnClick={ handleInputSearchReset }
                       icon={ <CrossIcon
                           width={ '16px' }
                           height={ '16px' }
                           fill={ searchValues.join() ? '#000000' : '#bfbfbf' }/>
                       }/>
            </SMobileSearchInputWrapper> }
            <SHideIconWrapper onClick={ handleMenuClose }>
                { isMenuOpen ?
                    <ArrowUpIcon width='30px' height='30px' fill='#adadad'/> :
                    <ArrowDownIcon width='30px' height='30px' fill='#adadad'/> }
            </SHideIconWrapper>
        </SHeader>
    )
}

const SHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 16%);
  margin: 0 10px;
  position: sticky;
  top: 0;
  z-index: 1;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const SItemsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @media screen and (max-width: 399px) {
    display: none;
  }
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
  margin: 5px;
`;

const SButtonsWrapper = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 1000px) {
    align-items: normal;
    flex-direction: column;
  }
`;

const SRow = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 299px) {
    align-items: normal;
    flex-direction: column;
  }
`;

const SSearchInputWrapper = styled.div`
  display: flex;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const SMobileSearchInputWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 424px;

  @media screen and (min-width: 1001px) {
    display: none;
  }

  @media screen and (max-width: 399px) {
    max-width: 310px;
  }
`;

const SHideIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;

  @media screen and (min-width: 1001px) {
    display: none;
  }
`;