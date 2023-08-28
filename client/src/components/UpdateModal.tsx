import { FC, useState } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ModalProps } from "../interfaces/updateModalInterface";
import { updateTask, fetchTasks } from "../requestMethods";
import { updateTasks } from "../redux/tasksRedux";

const UpdateModal: FC<ModalProps> = (props) => {
  const user = useSelector((state: RootState) => state.user?.currentUser);
  const dispatch = useDispatch();
  const { title, description, id } = props;
  const [updatedTitle, setUpdatedTitle] = useState<string>(title);
  const [updatedDescription, setUpdatedDescription] = useState<string>(description);

  const handleConfirmClick = async () => {
    await updateTask(user?._id, updatedTitle, updatedDescription, id)
    const tasksData = await fetchTasks(user._id);
    console.log(tasksData);
    props.setTasks(tasksData);
    dispatch(updateTasks(tasksData));
    props.closeModal();
  }
  return (
    <ModalOverlay>
    <ModalContent>
      <Input
        placeholder={title}
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
      />
      <Input
        placeholder={description}
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
      />
      <ButtonWrapper>
        <Button onClick={handleConfirmClick}>
          Confirm changes
        </Button>
        <Button onClick={props.closeModal}>Close</Button>
      </ButtonWrapper>
    </ModalContent>
  </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  max-width: 400px;
`;

const Input = styled.input`
  width: 90%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 12px 24px;
  margin: 0 8px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  position: relative;

  &:hover {
    background-color: #007bff;
    color: #fff;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;

    &:hover::after {
      content: "Parola nouă nu poate fi aceiași cu cea veche";
      position: fixed;
      top: calc(100% + 10px);
      left: calc(50% - 100px);
      background-color: #007bff;
      color: #fff;
      padding: 8px;
      border-radius: 4px;
      font-size: 14px;
      white-space: nowrap;
    }
  }
`;


export default UpdateModal;
