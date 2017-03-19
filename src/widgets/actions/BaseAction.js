export class BaseAction {
  constructor(mouseX, mouseY) {
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    this.ms = (new Date()).getTime();
  }
}
