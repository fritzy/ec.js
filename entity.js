'use strict';

const PriorityChain = require('priority-chain');

class Entity extends PriorityChain {

  constructor(registry) {
    super();
    this.registery = registry;
    this.componentSet = new Set();
    this.components = new Map();

    this.systems = new Set();
    this.parent = null;
  }

  addComponent(comps) {
    if (!Array.isArray(comps)) {
      comps = [comps];
    }
    comps.forEach((comp) => {
      this.componentSet.add(comp.name);
      if (!this.components.has(comp.name)) {
        this.components.set(comp.name) = [];
      }
      this.components.get(comp.name).push(comp);
    });
    this.registry.detectSystems(this);
  }


  setParent(entity) {
    this.parent = entity;
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
    for (let system of systems) {
      system.apply(this);
    }
  }

  addSystem(system) {
    this.systems.add(system);
  }


}

module.exports = Entity;
