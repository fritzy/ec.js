'use strict';

const PriorityChain = require('priority-chain');

class Entity extends PriorityChain {

  constructor(registry) {
    super();
    this.registry = registry;
    this.componentSet = new Set();
    this.components = new Map();

    this.systems = new Set();
    this.parent = null;
  }

  getRoot() {
    
    if (this.parent === null) {
      return this;
    }
    return this.parent;
  }

  addComponent(comps) {

    if (!Array.isArray(comps)) {
      comps = [comps];
    }
    comps.forEach((comp) => {
      this.componentSet.add(comp.type);
      if (!this.components.has(comp.name)) {
        this.components.set(comp.name, []);
      }
      this.components.get(comp.name).push(comp);
    });

    this.registry.detectSystems(this);
  }


  setParent(entity) {

    this.parent = this.emit('setParent', entity);
  }

  unsetParent() {
    
    this.emit('unsetParent', entity)
    this.parent = null;
  }

  addEntity(entity, slot) {

    this.entities.set(slot, entity);
    entity.setParent(this);
    this.emit('addEntity', {
      target: this,
      entity,
      slot: slot
    });
  }

  getNewSystems(systems) {

    if (!Array.isArray(systems)) {
      systems = [systems];
    }

    for (let system of systems) {
      system.apply(this);
      console.log("system:", system);
    }
  }

  addSystem(system) {
    this.systems.add(system);
    this.emit('addSystem', system);
  }


}

module.exports = Entity;
