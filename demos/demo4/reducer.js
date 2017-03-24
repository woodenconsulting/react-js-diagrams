import undoable, { includeAction } from 'redux-undo';

const getInitialState = () => ({
  selectedNode: null,
  model: null
});

export const reducerFn = (state = getInitialState(), action) => {
  switch (action.type) {
    case 'node-selected':
      return {
        ...state,
        selectedNode: action.node
      };
    case 'update-model':
      return {
        ...state,
        model: action.model,
        ...action.props
      };
    default:
      return state;
  }
};

export const reducer = undoable(reducerFn, {
  filter: includeAction(['update-model'])
});
