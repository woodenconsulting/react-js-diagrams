import { BaseAction } from './BaseAction';

export class MoveItemsAction extends BaseAction {
  constructor(mouseX, mouseY, diagramEngine) {
    super(mouseX, mouseY);
    this.moved = false;
    diagramEngine.enableRepaintEntities(diagramEngine.getDiagramModel().getSelectedItems());
    this.selectionModels = diagramEngine.getDiagramModel().getSelectedItems().map(item => ({
      model: item,
      initialX: item.x,
      initialY: item.y,
    }));
  }
}
