import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  inputValue: string;
  imagenURL: string;
  botonClick: boolean; 
}

const initialState: SearchState = {
  inputValue: "",
  imagenURL: "",
  botonClick: false, 
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
    setImagenURL: (state, action: PayloadAction<string>) => {
      state.imagenURL = action.payload;
    },
    setButtonPressed: (state, action: PayloadAction<boolean>) => {
      state.botonClick = action.payload;
    },
  },
});

export const { setInputValue, setImagenURL, setButtonPressed } =
  searchSlice.actions;

export const selectInputValue = (state: { search: SearchState }) =>
  state.search.inputValue;

export const selectImageUrl = (state: { search: SearchState }) =>
  state.search.imagenURL;

export const selectButtonPressed = (state: { search: SearchState }) =>
  state.search.botonClick;

export default searchSlice.reducer;
