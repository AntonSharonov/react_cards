import { FC } from "react";
import styled from "styled-components";
import { Button } from "../../ui/button";
import { $cardsData, onCardCreateModalReset, onNewCardCreated } from "../productCards/model";
import { useForm } from "react-hook-form";
import { useStore } from "effector-react";

export const CreateNewCardModal: FC = () => {
    const cards = useStore($cardsData);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data: { [x: string]: string }) => {
        let id = 0;
        cards.forEach((card) => {
            if (card.id > id) {
                id = card.id;
            }
        })
        id++;

        onNewCardCreated({
            id,
            name: data.name,
            tagline: data.tagline,
            first_brewed: `${ data.month }/${ data.year }`,
            image_url: '',
        });
        onCardCreateModalReset();
    }

    const handleClose = () => onCardCreateModalReset();

    return (
        <SCreateNewCardModal>
            <SHeader>Create a new card</SHeader>
            <SForm onSubmit={ handleSubmit(onSubmit) }>
                <SInput data-error={ errors.name?.type === 'required' }
                        { ...register('name', { required: true }) }
                        placeholder='Card name'
                />
                <SInput data-error={ errors.tagline?.type === 'required' }
                        { ...register('tagline', { required: true }) }
                        placeholder='Tagline'
                />
                <SInputDateWrapper>
                    <SInput
                        data-error={ errors.month?.type === 'required' || errors.month?.type === 'min' || errors.month?.type === 'max' }
                        data-content='month'
                        type='number'
                        { ...register('month', { required: true, min: 1, max: 12 }) }
                        placeholder='Month'
                    />
                    <SSlash>/</SSlash>
                    <SInput
                        data-error={ errors.year?.type === 'required' || errors.year?.type === 'min' || errors.year?.type === 'max' }
                        data-content='year'
                        type='number'
                        { ...register('year', { required: true, min: 1900, max: 2022 }) }
                        placeholder='Year'
                    />
                </SInputDateWrapper>
                <SButtons>
                    <Button onClick={ handleClose } text='Cancel'/>
                    <Button text='Create'/>
                </SButtons>
            </SForm>
        </SCreateNewCardModal>
    )
}

const SCreateNewCardModal = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px;
  width: 320px;
  min-height: 140px;
  background: #f7faff;
  box-shadow: 0 2px 8px rgba(8, 11, 48, 0.16);
  border-radius: 8px;

  @media screen and (max-width: 370px) {
    width: 100%;
    margin: 20px;
  }
`;

const SHeader = styled.p`
  margin: 0 0 12px;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  color: #232633;
`;

const SButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const SInput = styled.input`
  display: flex;
  width: 240px;
  outline: none;
  margin: 5px 0;
  padding: 0 20px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;

  &[data-error='true'] {
    border: 1px solid #fb3958;
  }

  &[type='submit'] {
    cursor: pointer;
    width: 110px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover, &[data-active='true']:hover {
      background-color: #f6f6f6;
    }
  }

  &[data-content='month'] {
    width: 84px;
  }

  &[data-content='year'] {
    width: 84px;
  }
`;

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const SInputDateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const SSlash = styled.p`
  margin: 0;
  width: 30px;
`;