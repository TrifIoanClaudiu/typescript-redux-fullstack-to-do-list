import { FC, useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { createTask, fetchTasks } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AddTaskProps } from "../interfaces/addTaskInterface";
import { updateTasks } from "../redux/tasksRedux";

const AddTask: FC<AddTaskProps> = (props) => {
  const user = useSelector((state: RootState) => state.user?.currentUser);
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleButton = async () => {
    await createTask(user._id, title, description);
    const tasksData = await fetchTasks(user._id);
    props.setTasks(tasksData);
    dispatch(updateTasks(tasksData));
  };

  return (
    <Container>
      <Input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => {
          setTitle(event.target.value);
        }}
      />
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      <Button title="Add Task" disabled={!title || !description} onClick={handleButton}>
        <AddIcon />
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 40%;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #0056b3;
  }
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "teal")};
  color: white;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#ccc" : "darkcyan")};
  }
`;

export default AddTask;