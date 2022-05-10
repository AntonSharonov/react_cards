import { FC, useEffect, useState } from "react";
import { useStore } from "effector-react";
import { $data, $isLoading, onFetchLoadingStarted } from "./cardList.model";
import { Card } from "../ui/card/card";
import styled from "styled-components";
import { Button } from "../ui/button";

export const CardList: FC = () => {
    const data = useStore($data);
    const isLoading = useStore($isLoading);

    const [isFiltered, filterToggle] = useState(false);
    const handleFilter = () => filterToggle(filter => !filter);

    useEffect(() => {
        onFetchLoadingStarted();
    }, [])

    return (
        <SCardList>
            <Button onClick={handleFilter} text={!isFiltered ? 'ПОКАЗАТЬ КАРТОЧКИ С ЛАЙКАМИ' : 'ПОКАЗАТЬ ВСЕ'}/>

            {data?.map((card) => (
                <Card key={card.id}
                      id={card.id}
                      isLoading={isLoading}
                      name={card.name}
                      firstBrewed={card.first_brewed}
                      imageUrl={card.image_url}
                      tagline={card.tagline}
                      isFiltered={isFiltered}
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