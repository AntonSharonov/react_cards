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
import { $isFiltered, $isLoading } from "../../shared/productCards/model";
import { useStore } from "effector-react";

interface ICard {
    id: string;
    imageUrl: string;
    name: string;
    firstBrewed: string;
    tagline: string;
}

export const Card: FC<ICard> = ({ id, imageUrl, name, firstBrewed, tagline }) => {
    const [isLiked, setLike] = useState(false);
    const likeClickHandler = () => setLike(like => !like);

    const [isDisplay, setDisplay] = useState(true);
    const displayClickHandler = () => setDisplay(display => !display);

    const [isChecked, setChecked] = useState(false);
    const checkboxClickHandler = () => setChecked(checked => !checked);

    const isLoading = useStore($isLoading);
    const isFiltered = useStore($isFiltered);

    const isHidden = !isDisplay || (isFiltered && !isLiked);

    if (isLoading) return (
        <SCard data-ishidden={isHidden}>
            <Loader text='Loading...'/>
        </SCard>
    )

    return (
        <SCard data-ishidden={isHidden}>
            <SCell data-size='small'><Paragraph text={id}/></SCell>
            <SCell data-size='small'><Checkbox isChecked={isChecked} onClick={checkboxClickHandler}/></SCell>
            <SCell data-size='small'><Image src={imageUrl || DEFAULT_IMG_SRC} height='120px' alt={name}/></SCell>
            <SCell data-size='large'><Title text={name}/></SCell>
            <SCell data-size='small'><Paragraph text={firstBrewed}/></SCell>
            <SCell data-size='large'><Paragraph text={tagline}/></SCell>
            <SCell data-size='small'><LikeButton isLiked={isLiked} onClick={likeClickHandler}/></SCell>
            <SCell data-size='small'><Button text='Remove' onClick={displayClickHandler}/></SCell>
        </SCard>
    )
}

const SCard = styled.div`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  height: 150px;
  margin: 5px;
  display: flex;

  &[data-ishidden='true'] {
    display: none;
  }
`;

const SCell = styled.div`
  height: 100%;
  border: 1px solid #e9eeff;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 2;
  margin: 3px;
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
`;