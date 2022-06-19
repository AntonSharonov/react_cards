import { FC } from "react";
import { useStore } from "effector-react";
import { $data, $isLoading, $isLoadingFinished } from "../../shared/productCards/model";
import { Card } from "../card/card";
import styled from "styled-components";
import { NothingHere } from "../nothingHere/nothingHere";
import { Loader } from "../loader";

export const CardList: FC = () => {
    const data = useStore($data);
    const isLoading = useStore($isLoading);
    const isLoadingFinished = useStore($isLoadingFinished);

    if (isLoading) {
        return <Loader/>
    }

    if (!data.length && isLoadingFinished) {
        return <NothingHere/>
    }

    return (
        <SCardList>
            { data?.map((card) => (
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