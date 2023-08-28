import axios from "axios";
import {
  API_TASKS_FETCH,
  API_TASK_CREATE,
  API_TASK_DELETE,
  API_TASK_UPDATE,
} from "./APICalls";
const BASE_URL = "http://localhost:4000/";

const userStorage = localStorage.getItem("persist:root");
const user = userStorage ? JSON.parse(userStorage).user : null;

const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

export const fetchTasks = async (userId: string, title?: string) => {
  try {
    const queryParams = title ? { title } : {};
    const response = await axios.request({
      method: "GET",
      url: `${API_TASKS_FETCH}/${userId}`,
      headers: {
        token: `Bearer ${TOKEN}`,
      },
      params: queryParams,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const completeTask = async (taskId: string, userId: string) => {
  try {
    await axios.delete(`${API_TASK_DELETE}${taskId}`, {
      headers: {
        token: `Bearer ${TOKEN}`,
      },
      data: {
        userId,
      },
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateTask = async (
  userId: string,
  title: string,
  description: string,
  taskId: string
) => {
  try {
    await axios.put(
      `${API_TASK_UPDATE}${taskId}`,
      {
        userId,
        title,
        description,
      },
      {
        headers: {
          token: `Bearer ${TOKEN}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const createTask = async (
  userId: string,
  title: string,
  description: string
) => {
  try {
    await axios.post(
      `${API_TASK_CREATE}`,
      {
        userId,
        title,
        description,
      },
      {
        headers: {
          token: `Bearer ${TOKEN}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
  }
};

export const searchTasks = async () => {};
