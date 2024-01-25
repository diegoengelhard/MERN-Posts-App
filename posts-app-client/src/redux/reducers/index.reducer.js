import { combineReducers } from 'redux';

import postsReducer from './post.reducer';
import authReducer from './auth.reducer';

export const reducers = combineReducers({ posts: postsReducer, auth: authReducer});