import { FC } from "react";
import styled from "styled-components";
import { Button } from "../ui/button";
import { $data, onCreateCardModalReset, onCreateNewCard } from "./productCards/model";
import { useForm } from "react-hook-form";
import { useStore } from "effector-react";

export const CreateNewCardModal: FC = () => {
    const cards = useStore($data);
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: { [x: string]: string }) => {
        let id = 0;
        cards.forEach((card) => {
            if (card.id > id) {
                id = card.id;
            }
        })
        id++;
        const date = data.date.split('-');
        const firstBrewed = `${ date[1] }/${ date[0] }`;

        onCreateNewCard({
            id,
            name: data.name,
            tagline: data.tagline,
            first_brewed: firstBrewed,
            image_url: '',
        });
        onCreateCardModalReset();
    }
    const handleClose = () => onCreateCardModalReset();

    return (
        <SCreateNewCardModal>
            <SHeader>Create a new card</SHeader>
            <SForm onSubmit={ handleSubmit(onSubmit) }>
                <SInput { ...register('name', { required: true }) }
                        placeholder='Type card name here'
                />
                <SInput { ...register('tagline', { required: true }) }
                        placeholder='Type tagline here'
                />
                <SInput { ...register('date', { required: true }) } type='date'
                        placeholder='Type date here'
                />
                <SButtons>
                    <Button onClick={ handleClose } text='Cancel'/>
                    <SInput type="submit"/>
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
`;

const SInput = styled.input`
  display: flex;
  width: 80%;
  outline: none;
  margin: 5px;
  padding: 0 20px;
  height: 40px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`;

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
