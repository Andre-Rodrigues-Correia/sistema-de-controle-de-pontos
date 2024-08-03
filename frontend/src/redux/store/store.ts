import { configureStore } from '@reduxjs/toolkit';
import collaboratorsReducer from "../reducers/collaboratorsReducer";

const store = configureStore({
    reducer: {
        funcionario: collaboratorsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
