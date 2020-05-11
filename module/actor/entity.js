/**
 * Extend the base Actor class to implement additional logic specialized for BitD.
 */
export class CharacterBitD extends Actor {
  /**
   * Augment the basic actor data with additional dynamic data.
   */
  prepareData() {
    super.prepareData();

    const actorData = this.data;

    // Prepare Character data
    if (actorData.type === "character") this._prepareCharacterData(actorData);
    else if (actorData.type === "npc") this._prepareNPCData(actorData);
  }

  /* -------------------------------------------- */

  prepare() {
    let preparedData = duplicate(this.data);

    for (let [c, cond] of Object.entries(preparedData.data.conditions)) {
      cond.label = CONFIG.BITD.conditions[c];
    }

    for (let [a, att] of Object.entries(preparedData.data.attributes)) {
      att.label = CONFIG.BITD.attributes[a];

      for (let [ac, act] of Object.entries(att.actions)) {
        act.label = CONFIG.BITD.actions[ac];
      }
    }

    // Prepare Character data
    if (preparedData.type === "character")
      this._prepareCharacterData(preparedData);
    else if (preparedData.type === "npc") this._prepareNPCData(preparedData);

    console.log(preparedData);

    return preparedData;
  }

  /**
   * Prepare Character type specific data
   */
  _prepareCharacterData(actorData) {
    this._prepareConditions(actorData.data.conditions);
    this._prepareStress(actorData.data);
    this._prepareTrauma(actorData.data);
    this._prepareAttributes(actorData.data);
    this._prepareActions(actorData.data);
  }

  /* -------------------------------------------- */

  /**
   * Prepare NPC type specific data
   */
  _prepareNPCData(actorData) {}

  /* -------------------------------------------- */

  _prepareConditions(conditions) {
    const map = {
      conditions: CONFIG.BITD.conditions,
    };
    for (let [c, choices] of Object.entries(map)) {
      const condition = conditions[c];
      if (!condition) continue;
      let values = [];
      if (condition.value) {
        values =
          condition.value instanceof Array
            ? condition.value
            : [condition.value];
      }
      condition.selected = values.reduce((obj, t) => {
        obj[t] = choices[t];
        return obj;
      }, {});
    }
  }

  /* -------------------------------------------- */

  _prepareStress(actorData) {
    const current = actorData.status.stress.value;

    let steadyTrait = "";
    // let steadyTrait = actorData.crew.upgrades.find(u => u.name.toLowerCase().includes(game.i18n.localize("BITD.CREW.UPGRADES.Steady").toLowerCase()));
    let stress = steadyTrait ? 10 : 9;
    let lvl = [];

    for (let i = 0; i <= stress; i++) {
      if (i <= current && current != 0 && i != 0) {
        lvl[i] = true;
      } else if (current === 0 && i === 0) {
        lvl[i] = false;
      } else {
        lvl[i] = false;
      }
    }

    if (current > 0) {
      actorData.status.stress.clear = true;
    } else {
      actorData.status.stress.clear = false;
    }

    actorData.status.stress.levels = lvl;
  }

  /* -------------------------------------------- */

  _prepareTrauma(actorData) {
    const current = actorData.status.trauma.value;

    let hardenedTrait = "";
    // let hardenedTrait = actorData.crew.upgrades.find(u => u.name.toLowerCase().includes(game.i18n.localize("BITD.CREW.UPGRADES.Hardenedy").toLowerCase()));
    let trauma = hardenedTrait ? 5 : 4;
    let lvl = [];

    for (let i = 0; i <= trauma; i++) {
      if (i <= current && current != 0 && i != 0) {
        lvl[i] = true;
      } else if (current === 0 && i === 0) {
        lvl[i] = false;
      } else {
        lvl[i] = false;
      }
    }

    if (current > 0) {
      actorData.status.trauma.clear = true;
    } else {
      actorData.status.trauma.clear = false;
    }

    actorData.status.trauma.levels = lvl;
  }

  /* -------------------------------------------- */

  _prepareAttributes(actorData) {
    Object.keys(actorData.attributes).forEach(function (attribute) {
      let current = actorData.attributes[attribute]["value"];
      let lvl = [];

      for (let i = 0; i <= actorData.attributes[attribute].max; i++) {
        if (i <= current && current != 0 && i != 0) {
          lvl[i] = true;
        } else if (current === 0 && i === 0) {
          lvl[i] = false;
        } else {
          lvl[i] = false;
        }
      }

      if (current > 0) {
        actorData.attributes[attribute].clear = true;
      } else {
        actorData.attributes[attribute].clear = false;
      }

      actorData.attributes[attribute]["levels"] = lvl;
    });
  }

  /* -------------------------------------------- */

    _prepareActions(actorData) {
      Object.keys(actorData.attributes).forEach(function (attribute) {
        Object.keys(actorData.attributes[attribute].actions).forEach(function (action) {
          let current = actorData.attributes[attribute].actions[action].value;
          let lvl = [];
    
          for (let i = 0; i <= actorData.attributes[attribute].actions[action].max; i++) {
            if (i <= current && current != 0 && i != 0) {
              lvl[i] = true;
            } else if (current === 0 && i === 0) {
              lvl[i] = false;
            } else {
              lvl[i] = false;
            }
          }

          if (current > 0) {
            actorData.attributes[attribute].actions[action].clear = true;
          } else {
            actorData.attributes[attribute].actions[action].clear = false;
          }
    
          actorData.attributes[attribute].actions[action]["levels"] = lvl;
        });
      });
    }
  
    /* -------------------------------------------- */

  /** @override */
  getRollData() {
    const data = super.getRollData();
    const shorthand = game.settings.get("worldbuilding", "macroShorthand");

    // Re-map all actions onto the base roll data
    if (!!shorthand) {
      for (let [k, v] of Object.entries(data.actions)) {
        if (!(k in data)) data[k] = v.value;
      }
      delete data.actions;
    }
  }

  /* -------------------------------------------- */

  /* -------------------------------------------- */
  /*  Socket Listeners and Handlers
  /* -------------------------------------------- */

  /** @override */
  static async create(data, options = {}) {
    data.token = data.token || {};
    if (data.type === "character") {
      mergeObject(
        data.token,
        {
          vision: true,
          dimSight: 30,
          brightSight: 0,
          actorLink: true,
          disposition: 1,
        },
        { overwrite: false }
      );
    }
    return super.create(data, options);
  }
}
