import { BaseAction } from './BaseAction';

export class SelectingAction extends BaseAction {
  constructor(mouseX, mouseY) {
    super(mouseX, mouseY);
    this.mouseX2 = mouseX;
    this.mouseY2 = mouseY;
  }

  containsElement(x, y, diagramModel) {
    const z = diagramModel.getZoomLevel() / 100.0;
    return (
      (x + diagramModel.getOffsetX()) * z > this.mouseX  &&
      (x + diagramModel.getOffsetX()) * z < this.mouseX2 &&
      (y + diagramModel.getOffsetY()) * z > this.mouseY  &&
      (y + diagramModel.getOffsetY()) * z < this.mouseY2
    );
  }
}
