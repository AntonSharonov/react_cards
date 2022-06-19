import { FC } from "react";
import { NotFound } from "../images/notFound";
import styled from "styled-components";
import { Button } from "../button";

export const NothingHere: FC = () => {
    const handleCreateNewCard = () => alert('Create a New Card');
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
`;

const SText = styled.p`
  margin: 6px 0;
`;

const SWrapper = styled.div`
  display: flex;
  align-items: center;
`;