export const onNodeSelected = node => ({ type: 'node-selected', node });
export const updateModel = (model, props = {}) => ({ type: 'update-model', model, props });
export const undo = () => ({ type: 'undo' });
export const redo = () => ({ type: 'redo' });
