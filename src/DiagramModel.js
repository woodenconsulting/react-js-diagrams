import { LinkModel, NodeModel } from "./Common";
import { BaseEntity } from "./BaseEntity";
import * as _ from "lodash";

export class DiagramModel extends BaseEntity {
	constructor(){
		super();

		this.links = {};
		this.nodes = {};

		this.offsetX = 0;
		this.offsetY = 0;
		this.zoom = 100;
		this.rendered = false;
	}

	deSerializeDiagram(object, diagramEngine) {
		this.deSerialize(object);

		this.offsetX = object.offsetX;
		this.offsetY = object.offsetY;
		this.zoom = object.zoom;

		//deserialize nodes
		_.forEach(object.nodes,(node) => {
			let nodeOb = diagramEngine.getInstanceFactory(node._class).getInstance();
			nodeOb.deSerialize(node);

			//deserialize ports
			_.forEach(node.ports,(port) => {
				let portOb = diagramEngine.getInstanceFactory(port._class).getInstance();
				portOb.deSerialize(port);
				nodeOb.addPort(portOb);
			});

			this.addNode(nodeOb);
		});

		_.forEach(object.links,(link) => {
			let linkOb = diagramEngine.getInstanceFactory(link._class).getInstance();
			linkOb.deSerialize(link);

			if(link.target){
				linkOb.setTargetPort(this.getNode(link.target).getPortFromID(link.targetPort));
			}

			if(link.source){
				linkOb.setSourcePort(this.getNode(link.source).getPortFromID(link.sourcePort))
			}

			this.addLink(linkOb);
		});
	}

	serializeDiagram(){
		return _.merge(this.serialize(),{
			offsetX: this.offsetX,
			offsetY: this.offsetY,
			zoom: this.zoom,
			links: _.map(this.links,(link) => {
				return link.serialize();
			}),
			nodes: _.map(this.nodes,(link) => {
				return link.serialize();
			}),
		});
	}

	clearSelection(ignore) {
		_.forEach(this.getSelectedItems(),(element) => {
			if (ignore && ignore.getID() === element.getID()){
				return;
			}
			element.setSelected(false); //TODO dont fire the listener
		});
	}

	getSelectedItems() {
		var items  = [];

		//find all nodes
		items = items.concat(_.filter(this.nodes,(node) => {
			return node.isSelected();
		}));

		//find all points
		items = items.concat(_.filter(_.flatMap(this.links,(node) => {
			return node.points;
		}),(port) => {
			return port.isSelected();
		}));

		//find all links
		return items.concat(_.filter(this.links,(link) => {
			return link.isSelected();
		}));
	}

	setZoomLevel(zoom){
		this.zoom = zoom;
		this.itterateListeners((listener) => {
			listener.controlsUpdated();
		});
	}

	setOffset(offsetX, offsetY) {
		this.offsetX = offsetX;
		this.offsetY = offsetY;
		this.itterateListeners((listener) => {
			listener.controlsUpdated();
		});
	}

	setOffsetX(offsetX) {
		this.offsetX = offsetX;
		this.itterateListeners((listener) => {
			listener.controlsUpdated();
		});
	}

	setOffsetY(offsetY) {
		this.offsetX = offsetY;
		this.itterateListeners((listener) => {
			listener.controlsUpdated();
		});
	}

	getOffsetY(){
		return this.offsetY;
	}

	getOffsetX(){
		return this.offsetX;
	}

	getZoomLevel(){
		return this.zoom;
	}

	getNode(node) {
		if (node instanceof NodeModel){
			return node;
		}
		if (!this.nodes[node]){
			return null;
		}
		return this.nodes[node];
	}

	getLink(link) {
		if (link instanceof LinkModel){
			return link;
		}
		if(!this.links[link]){
			return null;
		}
		return this.links[link];
	}

	addLink(link) {
		link.addListener({
			entityRemoved: () => {
				this.removeLink(link);
			}
		});
		this.links[link.getID()] = link;
		this.itterateListeners((listener) => {
			listener.linksUpdated();
		});
		return link;
	}

	addNode(node) {
		node.addListener({
			entityRemoved: () => {
				this.removeNode(node);
			}
		});
		this.nodes[node.getID()] = node;
		this.itterateListeners((listener) => {
			listener.nodesUpdated();
		});
		return node;
	}

	removeLink(link) {
		if (link instanceof LinkModel){
			delete this.links[link.getID()];
			this.itterateListeners((listener) => {
				listener.linksUpdated();
			});
			return;
		}
		delete this.links[''+link];
		this.itterateListeners((listener) => {
			listener.linksUpdated();
		});
	}
	removeNode(node) {
		if (node instanceof NodeModel){
			delete this.nodes[node.getID()];
			this.itterateListeners((listener) => {
				listener.nodesUpdated();
			});
			return;
		}

		delete this.nodes['' + node];
		this.itterateListeners((listener) => {
			listener.nodesUpdated();
		});
	}

	getLinks() {
		return this.links;
	}

	getNodes() {
		return this.nodes;
	}
}
