import { FC, MouseEventHandler } from "react";
import styled from 'styled-components'

interface ILikeButton {
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
    isLiked: boolean;
}

export const LikeButton: FC<ILikeButton> = ({ onClick, isLiked }) => (
    <SLikeButton onClick={onClick} data-isliked={isLiked}/>
)

const SLikeButton = styled.button`
  background-color: #d9d9d9;
  margin: 0 5px 3px 0;
  position: relative;
  width: 12px;
  height: 22px;
  box-shadow: none;
  border-radius: 6px 6px 0 0;
  transform: rotate(315deg);
  border: none;
  outline: none;
  cursor: pointer;

  &:before {
    background-color: #d9d9d9;
    position: absolute;
    width: 22px;
    height: 12px;
    left: 0;
    bottom: 0;
    content: '';
    box-shadow: none;
    border-radius: 0 6px 6px 0;
  }

  &:hover {
    box-shadow: -1px 0 2px #d9d9d9;
  }

  &:hover:before {
    box-shadow: 0 1px 2px #d9d9d9;
  }

  &[data-isliked='true'], &[data-isliked='true']:before {
    background-color: #ef413c;
  }
`;