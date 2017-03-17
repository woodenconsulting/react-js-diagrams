import {Toolkit} from "./Toolkit";

export class BaseEntity {
	constructor() {
		this.listeners = {};
		this.id = Toolkit.UID();
	}

	getID() {
		return this.id;
	}

	clearListeners(){
		this.listeners = {};
	}

	deSerialize(data){
		this.id = data.id;
	}

	serialize(){
		return {
			id: this.id,
		};
	}

	itterateListeners(cb) {
		for (var i in this.listeners){
			cb(this.listeners[i]);
		}
	}

	removeListener(listener){
		if (this.listeners[listener]){
			delete this.listeners[listener];
			return true;
		}
		return false;
	}

	addListener(listener) {
		var uid = Toolkit.UID();
		this.listeners[uid] = listener;
		return uid;
	}
}
