import { FC } from "react";
import { useStore } from "effector-react";
import { $data } from "../../shared/productCards/model";
import { Card } from "../card/card";
import styled from "styled-components";

export const CardList: FC = () => {
    const data = useStore($data);

    return (
        <SCardList>
            {data?.map((card) => (
                <Card key={card.id}
                      id={card.id}
                      name={card.name}
                      firstBrewed={card.first_brewed}
                      imageUrl={card.image_url}
                      tagline={card.tagline}
                />
            ))}
        </SCardList>
    )
}

const SCardList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`;