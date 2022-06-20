import { createRef, FC, useEffect, useState } from "react";
import styled from 'styled-components'
import { Button } from "../../ui/button";
import {
    $selectedCardsIDs,
    $cardsData,
    $inputSearch,
    $isFiltered,
    $isShowHeaderMenu,
    $likedCardsIDs,
    onLikedCardsAdded,
    onCardCreateModalShowed,
    onCardRemoveModalShowed,
    onFilterChanged,
    onInputSearched,
    onHeaderMenuShowed,
    onSearchReset,
    onLikedCardsRemoved,
    onSelectedCardsReset,
    onSelectedCardsUpdated
} from "../productCards/model";
import { useStore } from "effector-react";
import { Input } from "../../ui/input";
import { Paragraph } from "../../ui/paragraph";
import { HeartIcon } from "../../ui/icons/heartIcon";
import { TrashIcon } from "../../ui/icons/trashIcon";
import { BrokenHeartIcon } from "../../ui/icons/brokenHeartIcon";
import { CrossIcon } from "../../ui/icons/crossIcon";
import { ArrowDownIcon } from "../../ui/icons/arrowDownIcon";
import { ArrowUpIcon } from "../../ui/icons/arrowUpIcon";

export const Header: FC = () => {
    const isFiltered = useStore($isFiltered);
    const inputRefMobile = createRef<HTMLInputElement>();
    const inputRef = createRef<HTMLInputElement>();
    const searchValues = useStore($inputSearch);
    const selectedIDs = useStore($selectedCardsIDs);
    const likedIDs = useStore($likedCardsIDs);
    const isMenuOpen = useStore($isShowHeaderMenu);

    const cards = useStore($cardsData);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        setSelected(Boolean(cards.length) && selectedIDs.length === cards.length);
    }, [selectedIDs.length, cards.length]);

    const handleSelect = () => {
        onSelectedCardsReset();
        if (!selected) {
            cards.forEach((card) => {
                onSelectedCardsUpdated(card.id);
            });
        }
    };

    const handleLikeSet = () => {
        for (let i = cards.length - 1; i >= 0; i--) {
            const selectedID = selectedIDs.find((id) => id === cards[i].id);
            const likedID = likedIDs.find((id) => id === cards[i].id);

            if (selectedID && selectedID !== likedID) onLikedCardsAdded(selectedID);
        }
    };

    const handleLikeRemove = () => {
        for (let i = cards.length - 1; i >= 0; i--) {
            const selectedID = selectedIDs.find((id) => id === cards[i].id);
            const likedID = likedIDs.find((id) => id === cards[i].id);

            if (selectedID && likedID) onLikedCardsRemoved(selectedID);
        }
    };

    const handleRemove = () => {
        if (selectedIDs.length) onCardRemoveModalShowed();
    }

    const handleInputSearchChangeMobile = () => onInputSearched(inputRefMobile.current?.value || '');
    const handleInputSearchChange = () => onInputSearched(inputRef.current?.value || '');
    const handleInputSearchReset = () => onSearchReset();
    const handleCreateNewCard = () => onCardCreateModalShowed();
    const handleFilterChanged = () => onFilterChanged();
    const handleMenuShow = () => onHeaderMenuShowed();

    const contains = (where: number[], what: number[]) => {
        for (let i = 0; i < what.length; i++) {
            if (where.indexOf(what[i]) === -1) return false;
        }
        return true;
    }

    const intersection = Boolean(selectedIDs.length && likedIDs.length && selectedIDs.filter(x => likedIDs.includes(x)).length);

    return (
        <SHeader>
            { isMenuOpen && <SRow>
                <SItemsWrapper>
                    <SItems>
                        <Paragraph text={ cards.length.toString() }/>
                        <Paragraph text='total'/>
                    </SItems>
                    <SItems>
                        <Paragraph text={ selectedIDs.length.toString() }/>
                        <Paragraph text='selected'/>
                    </SItems>
                    <SItems>
                        <Paragraph text={ likedIDs.length.toString() }/>
                        <Paragraph text='liked'/>
                    </SItems>
                </SItemsWrapper>
                <SButtonsWrapper>
                    <Button isDisable={ !cards.length }
                            onClick={ handleSelect }
                            isActive={ selected }
                            text={ !selected ? 'Select all' : 'Deselect all' }
                    />
                    <Button onClick={ handleCreateNewCard }
                            text='Create a new card'
                    />
                </SButtonsWrapper>
                <SSearchInputWrapper>
                    <Input isDisable={ !cards.length }
                           placeholder='Search in cards...'
                           value={ searchValues.join(' ') }
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
                            isDisable={ !cards.length }
                            isActive={ isFiltered }
                            text='FILTER: by liked'
                    />
                    <SIconsWrapper>
                        <SIconWrapper
                            data-active={ !contains(likedIDs, selectedIDs) }
                            onClick={ handleLikeSet }>
                            <HeartIcon width='26px'
                                       height='26px'
                                       fill={ !contains(likedIDs, selectedIDs) ? '#fb3958' : '#eaeaea' }
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
                            data-active={ Boolean(selectedIDs.length) }
                            onClick={ handleRemove }>
                            <TrashIcon
                                width='26px'
                                height='26px'
                                fill={ Boolean(selectedIDs.length) ? '#fb3958' : '#eaeaea' }
                            />
                        </SIconWrapper>
                    </SIconsWrapper>
                </SButtonsWrapper>
            </SRow> }
            { isMenuOpen && <SMobileSearchInputWrapper>
                <Input isDisable={ !cards.length }
                       placeholder='Search in cards...'
                       value={ searchValues.join(' ') }
                       onChange={ handleInputSearchChangeMobile }
                       ref={ inputRefMobile }
                       iconOnClick={ handleInputSearchReset }
                       icon={ <CrossIcon
                           width={ '16px' }
                           height={ '16px' }
                           fill={ searchValues.join() ? '#000000' : '#bfbfbf' }/>
                       }/>
            </SMobileSearchInputWrapper> }
            <SHideIconWrapper onClick={ handleMenuShow }>
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
  margin: 10px 0;

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
  cursor: pointer;
  width: 100%;

  @media screen and (min-width: 1001px) {
    display: none;
  }
`;