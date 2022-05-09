import { FC, useState } from "react";
import styled from "styled-components";
import { DEFAULT_IMG_SRC } from "../../assets/const";
import { Image } from "../image";
import { Title } from "../title";
import { Paragraph } from "../paragraph";
import { Button } from "../button";
import { LikeButton } from "../likeButton";
import { Loader } from "../loader";
import { Checkbox } from "../checkbox";

interface ICard {
    isLoading: boolean;
    name: string | null;
    date: string | null;
    imageUrl: string | null;
    tagline: string | null;
    isFiltered: boolean;
}

export const Card: FC<ICard> = ({ isLoading, name, date, imageUrl, tagline, isFiltered }) => {
    const [isLiked, setLike] = useState(false);
    const likeClickHandler = () => setLike(like => !like);

    const [isRemoved, setRemoved] = useState(false);
    const removeClickHandler = () => setRemoved(display => !display);

    const [isChecked, setChecked] = useState(false);
    const checkboxClickHandler = () => setChecked(checked => !checked);

    const isHidden = isRemoved || (isFiltered && !isLiked);

    if (isLoading) return (
        <SCard data-ishidden={isHidden}>
            <Loader text='Loading...'/>
        </SCard>
    )

    return (
        <SCard data-ishidden={isHidden}>
            <SCell data-size='small'><Checkbox isChecked={isChecked} onClick={checkboxClickHandler}/></SCell>
            <SCell data-size='small'><Image src={imageUrl || DEFAULT_IMG_SRC} height='140px' alt={name || ''}/></SCell>
            <SCell data-size='large'><Title text={name || ''}/></SCell>
            <SCell data-size='small'><Paragraph text={date || ''}/></SCell>
            <SCell data-size='large'><Paragraph text={tagline || ''}/></SCell>
            <SCell data-size='small'><LikeButton isLiked={isLiked} onClick={likeClickHandler}/></SCell>
            <SCell data-size='small'><Button text='Remove' onClick={removeClickHandler}/></SCell>
        </SCard>
    )
}

const SCard = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  width: 70%;
  height: 150px;
  margin: 10px;
  background-color: #e3faff;
  display: flex;

  &[data-ishidden='true'] {
    display: none;
  }
`;

const SCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;

  &[data-size='small'] {
    flex: 1;
  }

  &[data-size='medium'] {
    flex: 3;
  }

  &[data-size='large'] {
    flex: 4;
  }
`;