import { FC } from "react";
import styled from "styled-components";
import { DEFAULT_IMG_SRC } from "../../assets/const";
import { Image } from "../image";
import { Title } from "../title";
import { Paragraph } from "../paragraph";
import { Checkbox } from "../checkbox";
import {
    $checkedIDs,
    $inputSearch,
    $isFiltered,
    $likedIDs,
    onRemoveCard,
    updateCheckedRoles,
    updateLikedRoles
} from "../../shared/productCards/model";
import { useStore } from "effector-react";
import { HeartIcon } from "../icons/heartIcon";
import { TrashIcon } from "../icons/trashIcon";

interface ICard {
    id: number;
    imageUrl: string;
    name: string;
    firstBrewed: string;
    tagline: string;
}

export const Card: FC<ICard> = ({ id, imageUrl, name, firstBrewed, tagline }) => {
    const isFiltered = useStore($isFiltered);
    const searchValues = useStore($inputSearch);
    const checkedIDs = useStore($checkedIDs);
    const likedIDs = useStore($likedIDs);
    const isChecked = Boolean(checkedIDs.find((checkedID) => checkedID === id));
    const isLiked = Boolean(likedIDs.find((likedID) => likedID === id));

    const searchInCard = (name: string, tagline: string, firstBrewed: string, searchValues: string[]): boolean => {
        return searchValues.filter(val => val).every((value, index) => {
            return (((index === 0) || (index > 0 && value)) && Boolean([name, tagline, firstBrewed].find(val => {
                return val.replace(/[^a-zа-я\d]/gi, '').toLowerCase()
                    .indexOf(value.replace(/[^a-zа-я\d]/gi, '').toLowerCase()) !== -1;
            })))
        })
    }

    const isHidden = (isFiltered && !isLiked) || !searchInCard(name, tagline, firstBrewed, searchValues);

    return (
        <SCard data-ishidden={ isHidden } data-checked={ isChecked }>
            <SCell data-size='small'><Checkbox isChecked={ isChecked }
                                               onChange={ () => updateCheckedRoles(id) }/></SCell>
            <SCell data-size='medium'><SImage src={ imageUrl || DEFAULT_IMG_SRC } height='200px' alt={ name }/></SCell>
            <SCell data-size='large'><Title text={ name }/></SCell>
            <SCell data-size='small'><Paragraph text={ firstBrewed }/></SCell>
            <SCell data-size='large'><Paragraph text={ tagline }/></SCell>
            <SCell data-size='small'>
                <SIconWrapper onClick={ () => updateLikedRoles(id) }>
                    <HeartIcon fill={ isLiked ? '#fb3958' : '#adadad' } width={ '26px' } height={ '26px' }/>
                </SIconWrapper>
            </SCell>
            <SCell data-size='small'>
                <SIconWrapper onClick={ () => onRemoveCard(id) }>
                    <TrashIcon width={ '26px' } height={ '26px' } fill={ '#fb3958' }/>
                </SIconWrapper>
            </SCell>
        </SCard>
    )
}

const SCell = styled.div`
  height: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
  margin: 3px;
  border: 1px solid transparent;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 16%);

  &[data-size='small'] {
    flex: 1;
  }

  &[data-size='medium'] {
    flex: 3;
  }

  &[data-size='large'] {
    flex: 4;
  }

  &:hover {
    background-color: #ebedf3 !important;
  }
`;

const SCard = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: 120px;
  margin: 5px;
  display: flex;

  &[data-ishidden='true'] {
    display: none;
  }

  &:hover ${ SCell } {
    background-color: #F8F9FF;
  }

  &[data-checked='true'] ${ SCell } {
    background-color: #F0F2FA;
    border: 1px solid #e3e3e3;
  }
`;

const SIconWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SImage = styled(Image)`
  transform: rotate(90deg);
`;