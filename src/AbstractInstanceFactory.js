import { BaseEntity } from './BaseEntity';

export class AbstractInstanceFactory extends BaseEntity {
  constructor(className) {
    super(className);
    this.className = className;
  }

  getName() {
    return this.className;
  }
}
