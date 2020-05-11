/**
 * Extend the basic ActorSheet class to do all the BitD things!
 * This sheet is an Abstract layer which is not used.
 *
 * @type {ActorSheet}
 */
export class ActorSheetBitD extends ActorSheet {
  constructor(...args) {
    super(...args);

    /**
     * Track the set of item filters which are applied
     * @type {Set}
     */
    this._filters = {
      specialabilities: new Set(),
      projects: new Set(),
      biography: new Set(),
    };
  }

  /* -------------------------------------------- */

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      scrollY: [
        ".specialabilities .abilities-list",
        ".projects .abilities-list",
        ".biography .abilities-list",
      ],
      tabs: [
        {
          navSelector: ".tabs",
          contentSelector: ".sheet-body",
          initial: "description",
        },
      ],
    });
  }

  /* -------------------------------------------- */

  /** @override */
  getData() {
    const sheetData = super.getData();

    // Basic data
    let isOwner = this.entity.owner;

    sheetData.owner = isOwner;
    sheetData.limited = this.entity.limited;
    sheetData.options = this.options;
    sheetData.editable = this.isEditable;
    sheetData.cssClass = isOwner ? "editable" : "locked";
    sheetData.isCharacter = this.entity.data.type === "character";
    sheetData.isNPC = this.entity.data.type === "npc";
    sheetData.config = CONFIG.BITD;

    // The Actor and its Items
    mergeObject(sheetData.actor, this.actor.prepare());

    // Return data to the sheet
    return sheetData;
  }

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers
  /* -------------------------------------------- */

  /**
   * Activate event listeners using the prepared sheet HTML
   * @param html {HTML}   The prepared HTML object ready to be rendered into the DOM
   */
  activateListeners(html) {
    // Editable Only Listeners
    if (this.isEditable) {
      // Relative updates for numeric fields
      html
        .find('input[data-dtype="Number"]')
        .change(this._onChangeInputDelta.bind(this));
    }

    // Handle default listeners last so system listeners are triggered first
    super.activateListeners(html);
  }

  /* -------------------------------------------- */

  /** @override */
  setPosition(options = {}) {
    const position = super.setPosition(options);
    const sheetBody = this.element.find(".sheet-body");
    const bodyHeight = position.height - 192;
    sheetBody.css("height", bodyHeight);
    return position;
  }

  /* -------------------------------------------- */

  /* -------------------------------------------- */
  /*  Event Listeners and Handlers                */
  /* -------------------------------------------- */

  /**
   * Handle input changes to numeric form fields, allowing them to accept delta-typed inputs
   * @param event
   * @private
   */
  _onChangeInputDelta(event) {
    const input = event.target;
    const value = input.value;
    if (["+", "-"].includes(value[0])) {
      let delta = parseFloat(value);
      input.value = getProperty(this.actor.data, input.name) + delta;
    } else if (value[0] === "=") {
      input.value = value.slice(1);
    }
  }
}
