const getInitialState = () => ({
  selectedNode: null
});

export const reducer = (state = getInitialState(), action) => {
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
