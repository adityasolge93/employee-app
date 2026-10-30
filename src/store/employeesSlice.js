import { createSlice } from '@reduxjs/toolkit';
import { getSavedEmployees, saveEmployees } from '../utils/mockEmployees';

const initialState = {
  list: [],
  sortConfig: {
    key: 'id',
    direction: 'asc',
  },
  loading: false,
  error: null,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    loadEmployees: (state) => {
      const stored = getSavedEmployees();
      state.list = stored;
    },
    addEmployee: (state, action) => {
      state.list.unshift(action.payload);
      saveEmployees(state.list);
    },
    setSorting: (state, action) => {
      const { key } = action.payload;
      if (state.sortConfig.key === key) {
        state.sortConfig.direction =
          state.sortConfig.direction === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortConfig.key = key;
        state.sortConfig.direction = 'asc';
      }
    },
  },
});

export const { loadEmployees, addEmployee, setSorting } = employeesSlice.actions;

export default employeesSlice.reducer;

