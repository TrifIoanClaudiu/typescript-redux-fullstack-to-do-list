import { TaskProps } from "./taskInterface";

export interface ModalProps {
  id: string;
  title: string;
  description: string;
  closeModal: () => void;
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
}
