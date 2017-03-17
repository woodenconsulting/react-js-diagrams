import { BaseEntity } from "./BaseEntity";
import * as _ from "lodash";

/**
 * @author Dylan Vorster
 */
export class BaseModel extends BaseEntity {
	constructor(){
		super();
		this.selected = false;
	}

	deSerialize(ob){
		super.deSerialize(ob);
		this.selected = ob.selected;
	}

	serialize(){
		return _.merge(super.serialize(),{
			_class: this.constructor.name,
			selected: this.selected
		});
	}

	getID() {
		return this.id;
	}

	isSelected() {
		return this.selected;
	}

	setSelected(selected){
		this.selected = selected;

		this.itterateListeners(listener => {
			if(listener.selectionChanged) {
				listener.selectionChanged();
			}
		});
	}

	remove(){
		this.itterateListeners(listener => {
			if(listener.entityRemoved) {
				listener.entityRemoved();
			}
		});
	}
}

export class PointModel extends BaseModel{
	constructor(link, points) {
		super();
		this.x = points.x;
		this.y = points.y;
		this.link = link;
	}

	deSerialize(ob){
		super.deSerialize(ob);
		this.x = ob.x;
		this.y = ob.y;
	}

	serialize() {
		return _.merge(super.serialize(),{
			x: this.x,
			y: this.y
		});
	}

	remove() {
		super.remove();

		//clear references
		if (this.link){
			this.link.removePoint(this);
		}
	}

	updateLocation(points) {
		this.x = points.x;
		this.y = points.y;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	getLink() {
		return this.link;
	}
}

export class LinkModel extends BaseModel{
	constructor(){
		super();
		this.linkType = 'default';
		this.points = [
			new PointModel(this,{x: 0,y: 0}),
			new PointModel(this,{x: 0,y: 0}),
		];
		this.extras = {};
		this.sourcePort = null;
		this.targetPort = null;
	}

	deSerialize(ob){
		super.deSerialize(ob);
		this.linkType = ob.type;
		this.points = _.map(ob.points, point => {
			var p = new PointModel(this, {x: point.x,y:point.y});
			p.deSerialize(point);
			return p;
		})
	}

	serialize(){
		return _.merge(super.serialize(),{
			type: this.linkType,
			source: this.sourcePort ? this.sourcePort.getParent().id:null,
			sourcePort: this.sourcePort ? this.sourcePort.id:null,
			target: this.targetPort ? this.targetPort.getParent().id:null,
			targetPort: this.targetPort ? this.targetPort.id:null,
			points: _.map(this.points,(point) => {
				return point.serialize();
			}),
			extras: this.extras
		});
	}

	remove() {
		super.remove();
		if (this.sourcePort){
			this.sourcePort.removeLink(this);
		}
		if (this.targetPort){
			this.targetPort.removeLink(this);
		}
	}

	isLastPoint(point) {
		var index = this.getPointIndex(point);
		return index === this.points.length-1;
	}

	getPointIndex(point) {
		return this.points.indexOf(point);
	}

	getPointModel(id) {
		for (var i = 0; i < this.points.length;i++){
			if (this.points[i].id === id){
				return this.points[i];
			}
		}
		return null;
	}

	getFirstPoint() {
		return this.points[0];
	}

	getLastPoint() {
		return this.points[this.points.length-1];
	}

	setSourcePort(port) {
		port.addLink(this);
		this.sourcePort = port;
	}

	getSourcePort() {
		return this.sourcePort;
	}

	getTargetPort() {
		return this.targetPort;
	}

	setTargetPort(port) {
		port.addLink(this);
		this.targetPort = port;
	}

	getPoints() {
		return this.points;
	}

	setPoints(points) {
		this.points = points;
	}

	removePoint(pointModel) {
		this.points.splice(this.getPointIndex(pointModel),1);
	}

	addPoint(pointModel, index = 1) {
		this.points.splice(index,0,pointModel);
	}

	getType() {
		return this.linkType;
	}
}

export class PortModel extends BaseModel {
	constructor(name) {
		super();
		this.name = name;
		this.links = {};
		this.parentNode = null;
	}

	deSerialize(ob){
		super.deSerialize(ob);
		this.name = ob.name;
	}

	serialize(){
		return _.merge(super.serialize(),{
			name: this.name,
			parentNode: this.parentNode.id,
			links: _.map(this.links,(link) => {
				return link.id;
			})
		});
	}

	getName() {
		return this.name;
	}

	getParent() {
		return this.parentNode;
	}

	setParentNode(node) {
		this.parentNode = node;
	}

	removeLink(link) {
		delete this.links[link.getID()];
	}

	addLink(link) {
		this.links[link.getID()] = link;
	}

	getLinks() {
		return this.links;
	}
}

export class NodeModel extends BaseModel {
	constructor(nodeType = 'default') {
		super();
		this.nodeType = nodeType;
		this.x = 0;
		this.y = 0;
		this.extras = {};
		this.ports = {};
	}

	deSerialize(ob) {
		super.deSerialize(ob);
		this.nodeType = ob.type;
		this.x = ob.x;
		this.y = ob.y;
		this.extras = ob.extras;
	}

	serialize() {
		return _.merge(super.serialize(),{
			type: this.nodeType,
			x: this.x,
			y: this.y,
			extras: this.extras,
			ports: _.map(this.ports, (port) => port.serialize())
		});
	}

	remove() {
		super.remove();
		for (var i in this.ports){
			_.forEach(this.ports[i].getLinks(),(link) => {
				link.remove();
			});
		}
	}

	getPortFromID(id) {
		for (var i in this.ports){
			if (this.ports[i].id === id){
				return this.ports[i];
			}
		}
		return null;
	}

	getPort(name) {
		return this.ports[name];
	}

	getPorts() {
		return this.ports;
	}

	removePort(port) {
		//clear the parent node reference
		if(this.ports[port.name]){
			this.ports[port.name].setParentNode(null);
			delete this.ports[port.name];
		}
	}

	addPort(port) {
		port.setParentNode(this);
		this.ports[port.name] = port;
		return port;
	}

	getType() {
		return this.nodeType;
	}
}
