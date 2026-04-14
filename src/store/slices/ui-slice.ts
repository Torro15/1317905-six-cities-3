import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITIES, SORT_TYPES } from '../../const';

interface UiState {
  city: string;
  sorting: string;
  error: string | null;
}

const initialState: UiState = {
  city: CITIES[0],
  sorting: SORT_TYPES[0].value,
  error: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
      state.sorting = SORT_TYPES[0].value;
    },
    setSorting: (state, action: PayloadAction<string>) => {
      state.sorting = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { changeCity, setSorting, setError } = uiSlice.actions;
export default uiSlice.reducer;
