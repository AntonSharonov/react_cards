import { FC, useState } from "react";
import { Image } from "../image";
import { Title } from "../title";
import { Paragraph } from "../paragraph";
import { Button } from "../button";
import { LikeButton } from "../likeButton";
import styled from "styled-components";
import { Loader } from "../loader";
import { DEFAULT_IMG_SRC } from "../../assets/const";

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

    const isHidden = isRemoved || (isFiltered && !isLiked);

    if (isLoading) return (
        <SCard data-ishidden={isHidden}>
            <Loader text='Loading...'/>
        </SCard>
    )

    return (
        <SCard data-ishidden={isHidden}>
            <Image src={imageUrl || DEFAULT_IMG_SRC} height='140px' alt={name || ''}/>
            <Title text={name || ''}/>
            <Paragraph text={date || ''}/>
            <Paragraph text={tagline || ''}/>
            <LikeButton isLiked={isLiked} onClick={likeClickHandler}/>
            <Button text='Remove' onClick={removeClickHandler}/>
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