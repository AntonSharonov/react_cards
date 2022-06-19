import { FC } from "react";
import { NotFound } from "../../ui/images/notFound";
import styled from "styled-components";
import { Button } from "../../ui/button";
import { onCardCreateModalShowed } from "../productCards/model";

export const NothingHere: FC = () => {
    const handleCreateNewCard = () => onCardCreateModalShowed();
    const handlePageRefresh = () => window.location.reload();

    return (
        <SNothingHere>
            <NotFound/>
            <SText>Oops! There is nothing here</SText>
            <SWrapper>
                <SText>Please,</SText>
                <Button text='Create a new card' onClick={ handleCreateNewCard }/>
                <SText>or</SText>
                <Button text='Refresh' onClick={ handlePageRefresh }/>
                <SText>the page</SText>
            </SWrapper>
        </SNothingHere>
    )
}

const SNothingHere = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 100px;

  @media screen and (max-height: 600px) {
    margin-top: 20px;
  }

  @media screen and (max-width: 440px) {
    margin-top: 20px;
  }
`;

const SText = styled.p`
  margin: 6px 0;
`;

const SWrapper = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 440px) {
    flex-direction: column;
  }
`;