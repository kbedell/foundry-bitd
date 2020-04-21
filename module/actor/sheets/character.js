import { ActorSheetBitD } from "./base.js";

/**
 * An Actor sheet for player character type actors in the D&D5E system.
 * Extends the base ActorSheet5e class.
 * @type {ActorSheetBitD}
 */
export class CharacterSheetBitD extends ActorSheetBitD {

  /**
   * Define default rendering options for the NPC sheet
   * @return {Object}
   */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["bitd", "sheet", "actor", "character"],
      width: 672,
      height: 736
    });
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  /**
   * Get the correct HTML template path to use for rendering this particular sheet
   * @type {String}
   */
  get template() {
    return "systems/bitd/templates/actors/character-sheet.html";
  }

  /* -------------------------------------------- */

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers
  /* -------------------------------------------- */

  /**
   * Activate event listeners using the prepared sheet HTML
   * @param html {HTML}   The prepared HTML object ready to be rendered into the DOM
   */
  activateListeners(html) {
    super.activateListeners(html);
    if (!this.options.editable) return;
  }

  /* -------------------------------------------- */
}
