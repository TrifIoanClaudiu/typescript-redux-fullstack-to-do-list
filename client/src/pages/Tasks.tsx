import { FC, useEffect, useState } from "react";
import Task from "../components/Task";
import styled from "styled-components";
import { TaskProps } from "../interfaces/taskInterface";
import { useSelector, useDispatch } from "react-redux";
import { updateTasks } from "../redux/tasksRedux";
import { RootState } from "../redux/store";
import { fetchTasks } from "../requestMethods";
import Footer from "../components/Footer";
import AddTask from "../components/AddTask";

const Tasks: FC = () => {
  const user = useSelector((state: RootState) => state.user?.currentUser);
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const tasksData = searchInput ? await fetchTasks(user._id, searchInput) : await fetchTasks(user._id);
        setTasks(tasksData);
        dispatch(updateTasks(tasksData));
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user, searchInput, dispatch]);

  return (
    <>
      <SearchContainer>
        <SearchInput
          placeholder="Search"
          value={searchInput}
          onChange={(event) => {
            setSearchInput(event.target.value);
          }}
        />
      </SearchContainer>
      <TaskList>
        {!isLoading &&
          tasks.map((currentTask) => {
            return (
              <TaskItem key={currentTask._id}>
                <Task
                  {...currentTask}
                  key={currentTask._id}
                  setTasks={setTasks}
                />
              </TaskItem>
            );
          })}
      </TaskList>
      <AddTask setTasks={setTasks} />
      <Footer />
    </>
  );
};

const TaskList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 2vh; /* Adjust this value for the desired spacing from the top */
`;

const SearchInput = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 18px;
  width: 400px;
`;

const TaskItem = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export default Tasks;
