import { BaseEntity } from "./BaseEntity";
/**
 * @author Dylan Vorster
 */
export class AbstractInstanceFactory extends BaseEntity {
	constructor(className) {
	  super(className);
		this.className = className;
	}
	
	getName(){
		return this.className;
	}
}
