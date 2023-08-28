export interface TaskProps {
  _id: string;
  title: string;
  description: string;
  updatedAt: string;
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
}
