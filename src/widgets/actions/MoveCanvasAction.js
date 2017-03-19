import { BaseAction } from './BaseAction';

export class MoveCanvasAction extends BaseAction {
  constructor(mouseX, mouseY, diagramModel) {
    super(mouseX, mouseY);
    this.initialOffsetX = diagramModel.getOffsetX();
    this.initialOffsetY = diagramModel.getOffsetY();
  }
}
