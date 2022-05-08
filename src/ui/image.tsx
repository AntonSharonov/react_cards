import { FC } from "react";
import styled from 'styled-components'

interface IImage {
    src: string;
    height: string;
    alt: string;
}

export const Image: FC<IImage> = (props) => <SImage {...props}/>

const SImage = styled.img``;