export default function createReducer (initialState, methods) {
  return (state = initialState, action) => {
    const reduceFn = methods[action.type];
    if (!reduceFn) {
      return state;
    }
    return { ...state, ...reduceFn(state, action) };
  };
}

export function reducer(initialState, handlers) {
  return (state = initialState, action) => {
    const reduceFn = handlers[action.type];
    return reduceFn ? reduceFn(state, action) : state;
  };
}
