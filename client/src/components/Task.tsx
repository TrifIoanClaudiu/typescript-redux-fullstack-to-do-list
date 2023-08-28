import { FC, useState } from "react";
import styled from "styled-components";
import { Typography, IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { TaskProps } from "../interfaces/taskInterface";
import { extractDate } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { completeTask, fetchTasks } from "../requestMethods";
import { updateTasks } from "../redux/tasksRedux";
import UpdateModal from "./UpdateModal";

const Task: FC<TaskProps> = (props) => {
  const user = useSelector((state: RootState) => state.user?.currentUser);
  const dispatch = useDispatch();
  const { title, description, updatedAt, _id: id } = props;
  const date: string | null = extractDate(updatedAt);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const openUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleCheckClick = async () => {
    try {
      await completeTask(id, user?._id);
      const tasksData = await fetchTasks(user._id);
      props.setTasks(tasksData);
      dispatch(updateTasks(tasksData));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TaskContainer>
      <TaskText>
        <Typography className="title" variant="subtitle1">
          {title}
        </Typography>
        <Typography className="description" variant="body2">
          {description}
        </Typography>
        <Typography className="date" variant="body2">
          {date}
        </Typography>
      </TaskText>
      <div>
        <IconButton color="primary" aria-label="Complete">
          <CheckIcon onClick={handleCheckClick} />
        </IconButton>
        <IconButton color="secondary" aria-label="Update">
          <EditIcon onClick={openUpdateModal} />
        </IconButton>
      </div>
      {showUpdateModal && (
        <UpdateModal
          closeModal={closeUpdateModal}
          setTasks = {props.setTasks}
          title={title}
          description={description}
          id={id}
        />
      )}
    </TaskContainer>
  );
};

export default Task;

const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TaskText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .title {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .description {
    font-size: 1rem;
  }

  .date {
    font-size: 0.8rem;
    color: #888;
  }
`;
