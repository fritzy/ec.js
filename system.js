'use strict';

function setContains(a, b) {
  for (let i of b) {
    if (!a.has(i)) return false;
  }
  return true;
}

class System {
  constructor(components) {
    this.requirements = new Set(components);
    this.entity = null;
  }

  apply(entity) {
    if (setContains(entity.componentSet, this.requirements)) {
      entity.addSystem(this);
    }
  }
}

module.exports = System;
