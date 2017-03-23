import undoable, { includeAction } from 'redux-undo';

const getInitialState = () => ({
  selectedNode: null
});

export const reducerFn = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'node-selected':
      return {
        ...state,
        selectedNode: action.node
      };
    default:
      return state;
  }
};

export const reducer = undoable(reducerFn, {
  filter: includeAction(['node-selected'])
});
