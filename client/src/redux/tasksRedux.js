import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    updateTasks: (state, action) => {
      state.tasks = action.payload.map((task) => ({
        ...task,
      }));
    },
  },
});

export const { updateTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
