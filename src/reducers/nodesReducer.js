const initialState = {
  spawnNumber: 9,
};

export const ADD_NODE = 'nodes/ADD_NODE';

export const addNode = payload => {
  return dispatch => {
    dispatch({
      type: ADD_NODE,
      payload
    });
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NODE:
      return {
        ...state,
        spawnNumber: state.spawnNumber + action.payload,
      };
    default:
      return state;
  }
};
