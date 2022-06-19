import { FC } from "react";
import { useStore } from "effector-react";
import { $cardsData, $isLoading, $isLoadingFinished } from "../productCards/model";
import { Card } from "../card/card";
import styled from "styled-components";
import { NothingHere } from "../nothingHere/nothingHere";
import { Loader } from "../../ui/loader";

export const CardList: FC = () => {
    const cards = useStore($cardsData);
    const isLoading = useStore($isLoading);
    const isLoadingFinished = useStore($isLoadingFinished);

    if (isLoading) {
        return <Loader/>
    }

    if (!cards.length && isLoadingFinished) {
        return <NothingHere/>
    }

    return (
        <SCardList>
            { cards?.map((card) => (
                <Card key={ card.id }
                      id={ card.id }
                      name={ card.name }
                      firstBrewed={ card.first_brewed }
                      imageUrl={ card.image_url }
                      tagline={ card.tagline }
                />
            )) }
        </SCardList>
    )
}

const SCardList = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  @media screen and (max-width: 1240px) {
    width: 1000px;
  }

  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;