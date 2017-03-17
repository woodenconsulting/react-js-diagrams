import {NodeWidgetFactory} from "../WidgetFactories";
import * as React from "react";
import {DefaultNodeWidget} from "./DefaultNodeWidget";
/**
 * @author Dylan Vorster
 */
export class DefaultNodeFactory extends NodeWidgetFactory{

	constructor(){
		super("default");
	}

	generateReactWidget(diagramEngine, node) {
		return React.createElement(DefaultNodeWidget,{
			node,
			diagramEngine
		});
	}
}