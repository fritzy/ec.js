'use strict';
const Component = require('./component');

class Registry {
  constructor() {
    this.components = new Map();
    this.entities = new Map();
    this.systems = new Map();
  }

  makeComponent(name, spec) {
    const Factory = function(values) {
      const component = new Component(name, spec);
      component.set(values);
      return component;
    };
    this.components.set(name, Factory);
    return Factory;
  }

  loadSpec(spec) {
    if (spec.hasOwnProperty('components')) {
      for (let name of Object.keys(spec.components)) {
        this.makeComponent(name, spec.components[name]);
      }
    }
  }

  detectSystems(entity) {
  }

}

module.exports = Registry;
