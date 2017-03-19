import { Toolkit } from './Toolkit';

export class BaseEntity {
  constructor() {
    this.listeners = {};
    this.id = Toolkit.UID();
  }

  getID() {
    return this.id;
  }

  clearListeners() {
    this.listeners = {};
  }

  deSerialize(data) {
    this.id = data.id;
  }

  serialize() {
    return {
      id: this.id,
    };
  }

  itterateListeners(cb) {
    for (const key in this.listeners) {
      cb(this.listeners[key]);
    }
  }

  removeListener(listener) {
    if (this.listeners[listener]) {
      delete this.listeners[listener];
      return true;
    }
    return false;
  }

  addListener(listener) {
    const uid = Toolkit.UID();
    this.listeners[uid] = listener;
    return uid;
  }
}
