'use strict';
const PriorityChain = require('priority-chain');

class Component extends PriorityChain {
  constructor(name, spec) {

    super();
    this.name = name;
    this.fields = new Set(Object.keys(spec));
    this.defaults = spec;
    this._data = {};

    for (let field of this.fields) {
      this._data[field] = spec[field];

      Object.defineProperty(this, field, {
        set: function (val) {

          val = this.emit('set:' + field, val);
          this._data[field] = val;
        },
        get: function () {

          let val = this._data[field];
          val = this.emit('get:' + field, val);
          return val;
        }
      });
    }
    this.entity = null;
  }

  set(values) {
    console.log(values)
    for (let field of Object.keys(values)) {
      if (this.fields.has(field)) {
        this[field] = values[field];
      }
    }
  }

  setEntity(entity) {
    this.entity = entity;
  }

  removeEntity() {
    this.entity = null;
  }

}

module.exports = Component;
