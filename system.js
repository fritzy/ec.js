'use strict';

function setContains(a, b) {
  for (let i of b) {
    if (!a.has(b)) return false;
  }
  return true;
}

class System {
  constructor(components) {
    this.requirements = new Set(components);
  }

  apply(entity) {
    if (setContains(entity.components, this.requirements)) {
      entity.addSystem(this);
    }
  }
}

module.exports = System;
