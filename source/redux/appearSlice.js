import { createSlice } from "@reduxjs/toolkit";

const appearSlice = createSlice({
    name: 'appearance',
    initialState: [],
    reducers: {
        setAppearance(state, action) {
            return action.payload;
        },
        resetAppearance(state, action) {
            return [];
        },
    },
})

export const { setAppearance, resetAppearance } = appearSlice.actions;
export default appearSlice.reducer;