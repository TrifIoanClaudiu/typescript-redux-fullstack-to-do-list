import { TaskProps } from "./taskInterface";

export interface AddTaskProps {
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
}
