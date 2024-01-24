import { combineReducers } from 'redux';

import postsReducer from './post.reducer';

export const reducers = combineReducers({ posts: postsReducer });