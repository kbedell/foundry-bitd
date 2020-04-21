
/**
 * Extend the base Actor class to implement additional logic specialized for BitD.
 */
export class CharacterBitD extends Actor {

  /**
     * Augment the basic actor data with additional dynamic data.
     */
  prepareData() {
    super.prepareData();

    // Get the Actor's data object
    const actorData = this.data;

    // Prepare character data
    if (actorData.type === "character") this._prepareCharacterData(actorData);
    else if (actorData.type === "npc") this._prepareNPCData(actorData);
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
  /*  Socket Listeners and Handlers
  /* -------------------------------------------- */

  /** @override */
  static async create(data, options = {}) {
    data.token = data.token || {};
    if (data.type === "character") {
      mergeObject(data.token, {
        vision: true,
        dimSight: 30,
        brightSight: 0,
        actorLink: true,
        disposition: 1
      }, { overwrite: false });
    }
    return super.create(data, options);
  }

  /* -------------------------------------------- */
}
