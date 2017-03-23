export const onNodeSelected = node => ({ type: 'node-selected', node });
export const updateModel = model => ({ type: 'update-model', model });
export const undo = () => ({ type: 'undo' });
export const redo = () => ({ type: 'redo' });
