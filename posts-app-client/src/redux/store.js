import { configureStore } from '@reduxjs/toolkit';

import { reducers } from './reducers/index.reducer';

export const store = configureStore({
    reducer: reducers,
});