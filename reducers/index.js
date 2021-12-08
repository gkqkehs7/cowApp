import { combineReducers } from 'redux';

import post from './post';

// (이전상태, 액션) => 다음상태
const rootReducer = (state, action) => {
  switch (action.type) {

    default: {
      const combineReducer = combineReducers({
        post,
      });
      return combineReducer(state, action);
    }
  }
};

export default rootReducer;
