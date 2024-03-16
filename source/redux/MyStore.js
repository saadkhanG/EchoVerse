import { configureStore } from "@reduxjs/toolkit";
import appearReducer from './appearSlice'

const MyStore = configureStore({
    reducer:{
        appearance:appearReducer,
    },
})

export default MyStore;