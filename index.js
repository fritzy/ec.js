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
    'tenticle': {
      type: 'slot',
      item: null
    }
  }
};

const entity = {
  id: '',
  components: [
    {
      name: 'left arm',
      type: 'slot',
      tags: ['grabbing', 'arm', 'hand'],
      item: null
    },
    {
      name: 'inventory',
      type: 'inventory',
      items: [],
      size: 10
    }
  ],
  children: []
};

registry.loadSpec(spec);

const player = new Entity(registry);
const equipment = new System(registry, ['slot']);

const Chest = registry.components.get('Armor')({absorb: 50, deflect: 10});

player.addComponent(registry.components.get('tenticle')({}));

player.subscribe('addSystem', 10, (system) => {
  console.log('added system', system);
  return system;
});

player.getNewSystems([equipment]);

/*
class Test extends Array {
  push(item) {
    Array.prototype.push.call(this, item);
    console.log(item);
  }
}
*/
