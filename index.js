'use strict';

const Entity = require('./entity');
const Component = require('./component');
const System = require('./system');
const Registry = require('./registry');

const registry = new Registry();

const spec = {
  components: {
    'Armor': {
      absorb: 0,
      deflect: 0
    },
    'Equipable': {
      effects: [],
      slot: 'unknown'
    },
    'Equiping': {
      slots: []
    }
  }
};

registry.loadSpec(spec);

const Player = new Entity(registry);

const Chest = registry.components.get('Armor')({absorb: 50, deflect: 10});

class Test extends Array {
  push(item) {
    Array.prototype.push.call(this, item);
    console.log(item);
  }
}

const derp = new Test();

derp.push('x');
console.log(derp);
