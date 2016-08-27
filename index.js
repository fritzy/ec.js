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
    'equipable': {
      slot: 'unknown'
    },
    'slot': {
      name: 'tenticle',
      item: null
    }
  }
};

registry.loadSpec(spec);

const player = new Entity(registry);
const equipment = new System(['equipment']);

const Chest = registry.components.get('Armor')({absorb: 50, deflect: 10});

player.addComponent(registry.components.get('equipment')({slots: new Set(['chest', 'neck', 'head', 'legs', 'lefthand', 'righthand', 'ring', 'ring']})))

player.subscribe('addSystem', 10, (system) => {
  console.log('added system', system);
  return system;
});

player.getNewSystems([Equipment]);

/*
class Test extends Array {
  push(item) {
    Array.prototype.push.call(this, item);
    console.log(item);
  }
}
*/
