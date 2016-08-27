'use strict';

module.exports = {
  name: 'equipable',
  condition(components) {

    return components.has('slot');
  },
  init() {
  },
  shutdown() {
  },
  entity: {
  },
  parent: {
  },
  root: {
    equip(event) {

      if (event.equipped) {
        return false;
      } else if (!event.item.componentSet.has('equipable')) {
        return false;
      }

      const equipableSet = new Set();
      for (const equipable of event.item.components.get('equipable')) {
        equipableSet.add(equipable.slot);
      }
      const slots = this.components.get('slot');
      for (const slot of slots) {
        if (equipableSet.has(slot.name) && slot.item === null) {
          slot.item = event.item;
          slot.item.setParent(this);
          event.equipped = true;
          break;
        }
      }
      return event;
    },

    unequip(event) {

      if (event.item !== null) {
        return false;
      }

      const slots = this.components.get('slot');
      for (const slot of slots) {
        if (slot.name === event.slot) {
          event.item = slot.item;
          slot.item.unsetParent(this);
          slot.item = null;
          break;
        }
      }
      return event;
    }
  }
};
