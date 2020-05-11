import { ActorSheetBitD } from "./base.js";
import { ConditionSelector } from "../../apps/condition-selector.js";

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
      width: 680,
      height: 790,
    });
  }

  /* -------------------------------------------- */
  /*  Rendering                                   */
  /* -------------------------------------------- */

  async _render(force = false, options = {}) {
    await super._render(force, options);
    $(this._element)
      .find(".increase")
      .attr("title", game.i18n.localize("BITD.IncreaseStress"));
  }

  /**
   * Get the correct HTML template path to use for rendering this particular sheet
   * @type {String}
   */
  get template() {
    return "systems/bitd/templates/actors/character-sheet.html";
  }

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

    // Pip Selectors
    html.find(".pip-value").click(this._onClickPip.bind(this));

    // condition Selector
    html
      .find(".condition-selector")
      .click(this._onConditionSelector.bind(this));
  }

  /* -------------------------------------------- */

  _onConditionSelector(event) {
    event.preventDefault();
    const a = event.currentTarget;
    const label = a.parentElement.querySelector("label");
    const options = {
      name: label.getAttribute("for"),
      title: label.innerText,
      choices: CONFIG.BITD[a.dataset.options],
    };
    new ConditionSelector(this.actor, options).render(true);
  }

  _onClickPip(event) {
    event.preventDefault();
    const input = event.target;
    const value = input.value;

    let name = "";

    let status = ["stress", "trauma"];
    let attributes = ["insight", "prowess", "resolve"];
    let actions = [
      "hunt",
      "study",
      "survey",
      "tinker",
      "finesse",
      "prowl",
      "skirmish",
      "wreck",
      "attune",
      "command",
      "consort",
      "sway",
    ];

    let re = /^([a-z]+)-.+-.+/;
    let matches = re.exec(input.name);

    if (status.includes(matches[1])) {
      name = `data.status.${matches[1]}.value`;
    } else if (attributes.includes(matches[1])) {
      name = `data.attributes.${matches[1]}.value`;
    } else if (actions.includes(matches[1])) {
      if (
        matches[1] === "hunt" ||
        matches[1] === "study" ||
        matches[1] === "survey" ||
        matches[1] === "tinker"
      ) {
        name = `data.attributes.insight.actions.${matches[1]}.value`;
      } else if (
        matches[1] === "finesse" ||
        matches[1] === "prowl" ||
        matches[1] === "skirmish" ||
        matches[1] === "wreck"
      ) {
        name = `data.attributes.prowess.actions.${matches[1]}.value`;
      } else if (
        matches[1] === "attune" ||
        matches[1] === "command" ||
        matches[1] === "consort" ||
        matches[1] === "sway"
      ) {
        name = `data.attributes.resolve.actions.${matches[1]}.value`;
      }
    }

    this.actor.update({ [`${name}`]: parseInt(value) });
  }
}
