# React JS Diagrams

A JSX / ECMAScript port of the awesome [react-diagrams](https://github.com/projectstorm/react-diagrams) repository by dylanvorster.

Note that this repo is currently under development.

## Introduction

A no-nonsense diagramming library written entirely in React with the help of Lodash. It aims to be:

* Simple, and void of any fuss/complications when implementing it into your own application
* Customizable without having to hack the core (adapters/factories etc..)
* Simple to operate and understand without sugar and magic
* Fast and optimized to handle large diagrams with hundreds of nodes/links
* Super easy to use, and should work as you expect it to

## How to install

```
npm install react-js-diagrams
```
or
```
yarn add react-js-diagrams
```

* Its only dependency is Lodash and obviously React so it will install that too.

#### How to see the examples

Simply navigate to the __demos__ directory and load up the corresponding index.html. Alternatively, you can
start the development server with `npm start` and navigate to `http://localhost:3000`.

To see how to create your own nodes like the one below, take a look at __demo3__:

![Demo2](./custom-nodes.png)


#### How to build / develop

Simply run ```webpack``` in the root directory and it will spit out the transpiled code and typescript definitions
into the dist directory as a single file. Run `npm start` to spin up the development server complete with HMR.


## How does it work

The library uses a Model Graph to represent the virtual diagram and then renders the diagram using
2 layers:
* Node Layer -> which is responsible for rendering nodes as HTML components
* Link Layer -> which renders the links as SVG paths

Each node and link is fed into a factory that then generates the corresponding node or link react widget.
Therefore, to create custom nodes and links, register your own factories that return your own widgets.

As long as a node contains at least one port and the corresponding NodeWidget contains at least one PortWidget,
a link can be connected to it.

## Events

**onChange events**
- items-drag-selected -> Array items (NodeModel | LinkModel)
- items-moved -> Array items (NodeModel | LinkModel)
- items-selected -> NodeModel model, Array items (NodeModel | LinkModel)
- items-deleted -> Array items (NodeModel | LinkModel | PointModel)
- items-copied -> Array items (NodeModel | LinkModel)
- items-pasted -> Array items (NodeModel | LinkModel)
- canvas-drag -> event
- canvas-shift-select -> event
- canvas-click -> event
- link-created -> PointModel model
- link-selected -> LinkModel model
- link-deselected -> LinkModel model, Array items (NodeModel | LinkModel)
- link-connected -> LinkModel linkModel, PortModel portModel
- node-selected -> NodeModel model
- node-deselected -> NodeModel model, Array items (NodeModel | LinkModel)
- node-moved -> NodeModel model
- point-created -> PointModel model
- point-selected -> PointModel model
- point-deselected -> PointModel model

## Questions

#### Why didn’t I render the nodes as SVG's?

Because its vastly better to render nodes as standard HTML so that we can embed input controls and not have
to deal with the complexities of trying to get SVG to work like we want it to. I also created this primarily to embed into
enterprise applications where the nodes themselves are highly interactive with buttons and other controls that cave when I try to use SVG.

#### How do I make my own elements?

Take a look at the __defaults__ directory, with specific attention to the __DefaultNodeWidget__

#### How do I use the library?

Take a look at the demo folders, they have simple and complex examples of the complete usage.

## Usage Demo and Guide

This is a demo of the interaction taken directly from the test folder.

![Demo](./demo.gif)

#### Key commands

__del key__ will remove anything selected including links

__shift and drag__ will trigger a multi selection box

__shift and select nodes/links/points__ will select multiple nodes

__drag canvas__ will drag the complete diagram

__mouse wheel__ will zoom in or out the entire diagram

__click link and drag__ will create a new link anchor/point that you can then drag around

__click node-port and drag__ will create a new link that is anchored to the port, allowing you
to drag the link to another connecting port

__ctrl or ⌘ + c__ copy any selected items; note that only links that belong to a selected source node will
be copied to the internal clipboard

__ctrl or ⌘ + v__ paste items previously copied to the internal clipboard
